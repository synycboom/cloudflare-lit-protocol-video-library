import { DisconnectOutlined } from '@ant-design/icons';
import DisconnectedStyle from './style';

export default function Disconnected() {
  return (
    <DisconnectedStyle>
      <div className='disconnected-content'>
        <DisconnectOutlined className='disconnected-icon' />
        <p>Please connect wallet</p>
      </div>
    </DisconnectedStyle>
  );
}
