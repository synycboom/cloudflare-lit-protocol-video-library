import Title from 'antd/lib/typography/Title';
import PageLayout from 'src/components/PageLayout';
import Button from 'src/components/Button';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Steps from 'antd/lib/steps';
import { ShareModal } from 'lit-access-control-conditions-modal';
import { useWeb3React } from '@web3-react/core';
import UploadPageStyle from './style';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { getOneTimeUpload, uploadFile } from 'src/apis/upload';
import { addVideo } from 'src/apis/kv';
import { getVideoInfo } from 'src/apis/video';
import { AccessControlCondition } from 'src/interfaces/accessControl';
import { checkAndSignAuthMessage, saveSigningCondition } from 'src/helpers/lit';

const { Step } = Steps;

const getChainIdFromAccessControls = (
  accessControls: AccessControlCondition[] | null
) => {
  if (!accessControls || (accessControls && !accessControls.length)) {
    message.error('invalid access controls');
    throw new Error('invalid access controls');
  }

  return accessControls[0].chain;
};

const UploadPage: React.FC = () => {
  const history = useHistory();
  const [isACLModalVisible, setACLModalVisible] = useState(false);
  const [accessControlConditions, setAccessControlConditions] = useState<
    AccessControlCondition[] | null
  >(null);
  const [authSig, setAuthSig] = useState(null);
  const [step, setStep] = useState(0);

  const { deactivate } = useWeb3React();

  const next = () => {
    setStep(step + 1);
  };

  const signAuthSig = async () => {
    const sig = await checkAndSignAuthMessage({
      chain: getChainIdFromAccessControls(accessControlConditions),
    });

    setAuthSig(sig);
  };

  const aclSettingComplete = async () => {
    setACLModalVisible(false);
    try {
      await signAuthSig();
    } catch (err: any) {
      message.error(err);
    }

    next();
  };
  const closeACLSetting = () => {
    setACLModalVisible(false);
    setAccessControlConditions(null);
  };

  const clear = () => {
    deactivate();
  };

  useEffect(() => {
    clear();
  }, []);

  const [isUploading, setIsUploading] = useState(false);

  const beforeUpload = async (file: File) => {
    if (!accessControlConditions) {
      return false;
    }

    setIsUploading(true);

    try {
      const otu = await getOneTimeUpload();
      if (!otu.success) {
        message.error(otu.errors[0].message);

        return false;
      }

      await uploadFile(otu.result.uploadURL, file);

      const info = await getVideoInfo(otu.result.uid);
      if (!info.success) {
        message.error(info.errors[0].message);

        return false;
      }

      const resourceId = {
        baseUrl: '',
        path: '',
        orgId: '',
        role: '',
        extraData: JSON.stringify({
          videoId: otu.result.uid,
          name: info.result.meta.name,
        }),
      };

      const chain = getChainIdFromAccessControls(accessControlConditions);
      await saveSigningCondition({
        accessControlConditions,
        chain,
        authSig,
        resourceId,
      });

      await addVideo(otu.result.uid, accessControlConditions, resourceId);

      message.success('the video has been uploaded');
      history.push('/');
    } catch (err) {
      message.error('cannot upload the video');
      console.error(err);
    } finally {
      setIsUploading(false);
    }

    return false;
  };

  return (
    <UploadPageStyle>
      <PageLayout showConnectWallet={false}>
        <div className='header'>
          <Title level={2}>Upload a Video</Title>
        </div>
        <Steps
          current={step}
          onChange={(value) => {
            if (value <= step) setStep(value);
          }}
          direction='vertical'
        >
          <Step
            disabled={step !== 0}
            title='Step 1: Choose Access Control Conditions'
            description={
              step === 0 && (
                <div>
                  <Button
                    type='primary'
                    style={{ marginTop: 8 }}
                    onClick={() => setACLModalVisible(true)}
                  >
                    Configure ACL
                  </Button>
                  {isACLModalVisible && (
                    <ShareModal
                      onClose={closeACLSetting}
                      sharingItems={[{ name: 'test', key: 1 }]}
                      onAccessControlConditionsSelected={(conditions: any) => {
                        setAccessControlConditions(conditions);
                      }}
                      getSharingLink={aclSettingComplete}
                    />
                  )}
                </div>
              )
            }
          />
          <Step
            disabled={step < 1}
            title='Step 2: Upload a video'
            description={
              <div>
                {step === 1 && (
                  <Upload
                    name='avatar'
                    listType='picture-card'
                    className='avatar-uploader'
                    showUploadList={false}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    beforeUpload={beforeUpload}
                  >
                    <div>
                      {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                )}
              </div>
            }
          />
        </Steps>
      </PageLayout>
    </UploadPageStyle>
  );
};

export default UploadPage;
