import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { getPresignedURL } from 'src/apis/video';
import { Stream } from '@cloudflare/stream-react';
import { LoadingOutlined } from '@ant-design/icons';
import VideoPlayerModalStyle from './style';

type Props = {
  jwt: string;
  open: boolean;
  videoId: string;
  videoName: string;
  onClose: () => void;
};

type VideoState = {
  loading: boolean;
  error: string;
  url: string;
};

const VideoPlayerModal = (props: Props) => {
  const [videoState, setVideoState] = useState<VideoState>({
    loading: false,
    error: '',
    url: '',
  });

  const loadVideo = async () => {
    setVideoState((prevState) => ({
      ...prevState,
      loading: true,
      error: '',
      url: '',
    }));

    try {
      const res = await getPresignedURL(props.jwt);
      if (!res.success) {
        setVideoState((prevState) => ({
          ...prevState,
          error: res.errors[0].message,
        }));

        return;
      }

      setVideoState((prevState) => ({
        ...prevState,
        url: `https://iframe.videodelivery.net/${res.result.token}`,
      }));
    } catch (err: any) {
      setVideoState((prevState) => ({ ...prevState, error: err.message }));
    } finally {
      setVideoState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    if (!props.open) {
      return;
    }

    loadVideo();
  }, [props.videoId, props.open]);

  return (
    <Modal
      className='video-player-modal'
      title={props.videoName}
      visible={props.open}
      footer={[]}
      onCancel={props.onClose}
    >
      <VideoPlayerModalStyle>
        <div className='video-player-modal-content'>
          {videoState.loading && <LoadingOutlined className='loading-icon' />}
          {videoState.error && <p>{videoState.error}</p>}
          {videoState.url && <Stream controls src={videoState.url} />}
        </div>
      </VideoPlayerModalStyle>
    </Modal>
  );
};

export default VideoPlayerModal;
