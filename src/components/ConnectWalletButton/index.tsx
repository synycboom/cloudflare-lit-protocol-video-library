import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import Button from 'src/components/Button';
import { formatAddress } from 'src/helpers/wallet';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { SUPPORTED_CHAINS } from 'src/constants';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import UAuth, { UserInfo } from '@uauth/js';
import { setRedirectUrl } from 'src/helpers';
import { useRecoilState } from 'recoil';
import { DEFAULT_PROFILE, profileState } from 'src/state/profile';
import ud from 'src/helpers/ud';
import { ModalStyle } from './style';
import { getSigner } from 'src/helpers/ether';

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINS,
});

let uauth: UAuth;

const ProviderButton = ({ children, onClick, icon }: any) => (
  <Button block onClick={onClick}>
    <img src={icon} />
    {children}
  </Button>
);

const ConnectWalletButton = ({ block, style }: any) => {
  const { account, activate, deactivate, active } = useWeb3React('root');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useRecoilState(profileState);

  useEffect(() => {
    const perform = async () => {
      uauth = ud();
      try {
        const user: UserInfo = await uauth.user();
        const authorization = await uauth.authorization();
        setProfile({
          walletAddress: user.wallet_address!,
          email: user.email!,
          ud: user.sub,
          idToken: authorization.idToken,
          metamask: null,
        });
      } catch (err: any) {
        console.error(err);
      }
    };

    perform();
  }, []);

  useEffect(() => {
    const perform = async () => {
      if (account && account !== profile.walletAddress) {
        const signer = getSigner();
        const message = `I am the owner of ${account}`;
        const signature = await signer.signMessage(message);

        setProfile({
          ...DEFAULT_PROFILE,
          walletAddress: account,
          metamask: {
            message,
            signature,
          },
        });
      }
    };

    perform();
  }, [account]);

  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.error(err);
    }

    setModalVisible(false);
  };

  const disconnect = async () => {
    try {
      setRedirectUrl();

      if (account) {
        deactivate();
      }
      if (profile.ud) {
        setLoading(true);
        await uauth.logout();
      }

      setProfile(DEFAULT_PROFILE);
      window.location.reload();
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loginWithUD = async () => {
    setRedirectUrl();

    try {
      await uauth.login();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ModalStyle
        visible={modalVisible}
        footer={null}
        closeIcon={<CloseCircleOutlined />}
        onCancel={() => setModalVisible(false)}
      >
        <Title level={4}>Connect to wallet</Title>

        <ProviderButton icon={'/metamask.svg'} onClick={connect}>
          Metamask
        </ProviderButton>

        <ProviderButton icon={'/ud.png'} onClick={loginWithUD}>
          Login with Unstoppable
        </ProviderButton>
      </ModalStyle>

      <Button
        type='primary'
        style={style}
        block={block}
        loading={loading}
        onClick={
          profile.walletAddress ? disconnect : () => setModalVisible(true)
        }
      >
        {profile.ud && (
          <img
            width='24px'
            height='24px'
            style={{ marginRight: 8 }}
            src='/ud.png'
          />
        )}

        {loading
          ? 'Logout...'
          : profile.walletAddress
          ? `Disconnect ${formatAddress(profile.walletAddress, 4)}`
          : 'Connect Wallet'}
      </Button>
    </>
  );
};

export default ConnectWalletButton;
