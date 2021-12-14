import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import Spin from 'antd/lib/spin';
import { getRedirectUrl } from 'src/helpers';
import ud from 'src/helpers/ud';

const CallbackPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const perform = async () => {
      try {
        const uauth = ud();
        await uauth.loginCallback();
        const redirectUrl: string = getRedirectUrl() || '/';
        history.push(redirectUrl);
      } catch (err: any) {
        message.error(err.message);
        console.error('callback error:', err);
      }
    };

    perform();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size='large' />
    </div>
  );
};

export default CallbackPage;
