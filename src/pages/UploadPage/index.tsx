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
import { useRecoilState } from 'recoil';
import { profileState } from 'src/state/profile';
import { AccessControlCondition } from 'src/interfaces/accessControl';
import { checkAndSignAuthMessage, saveSigningCondition } from 'src/helpers/lit';
import { getAuthentication } from 'src/helpers';
import { Authentication } from 'src/interfaces/authentication';
import Disconnected from 'src/components/Disconnected';
import { getBadRequestMessage } from 'src/helpers/api';

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
  const [profile] = useRecoilState(profileState);
  const [authSig, setAuthSig] = useState(null);
  const [step, setStep] = useState(0);
  const [auth, setAuth] = useState<Authentication | null>(null);
  const { deactivate } = useWeb3React();

  const next = () => {
    setStep(step + 1);
  };

  const back = () => {
    setStep(step - 1);
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
      message.error(err.message);
      return;
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

  useEffect(() => {
    const data = getAuthentication(profile);
    if (data) {
      setAuth(data);
    }
  }, [profile]);

  const [isUploading, setIsUploading] = useState(false);

  const beforeUpload = async (file: File) => {
    if (!accessControlConditions) {
      return false;
    }

    setIsUploading(true);

    try {
      if (!auth) {
        return false;
      }

      const otu = await getOneTimeUpload(auth);
      if (!otu.success) {
        message.error(otu.errors[0].message);

        return false;
      }

      await uploadFile(otu.result.uploadURL, file);

      const info = await getVideoInfo(otu.result.uid, auth);
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

      await addVideo(otu.result.uid, accessControlConditions, resourceId, auth);

      message.success('the video has been uploaded');
      history.push('/');
    } catch (err) {
      const msg = getBadRequestMessage(err);
      message.error(msg || 'cannot upload the video');
      console.error(err);
    } finally {
      setIsUploading(false);
    }

    return false;
  };

  return (
    <UploadPageStyle>
      <PageLayout showConnectWallet={true}>
        <div className='header'>
          <Title level={2}>Upload a Video</Title>
          <p>
            You can upload up to 5 videos. Please note that there is no delete
            video feature.
          </p>
        </div>

        {(() => {
          if (auth === null) {
            return <Disconnected />;
          }

          return (
            <>
              <Steps
                current={step}
                onChange={(value) => {
                  if (value <= step) setStep(value);
                }}
              >
                <Step
                  disabled={step !== 0}
                  title='Choose Access Control Conditions'
                />
                <Step disabled={step < 1} title='Upload a video' />
              </Steps>

              <div className='steps-content'>
                {(() => {
                  if (step === 0) {
                    return (
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
                            sharingItems={[]}
                            onAccessControlConditionsSelected={
                              setAccessControlConditions
                            }
                            getSharingLink={aclSettingComplete}
                          />
                        )}
                      </div>
                    );
                  }

                  if (step === 1) {
                    return (
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
                    );
                  }
                })()}
              </div>

              <div className='steps-action'>
                {step > 0 && (
                  <Button disabled={isUploading} onClick={back}>
                    Previous
                  </Button>
                )}
              </div>
            </>
          );
        })()}
      </PageLayout>
    </UploadPageStyle>
  );
};

export default UploadPage;
