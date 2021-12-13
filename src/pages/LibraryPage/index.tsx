import { useEffect, useState } from 'react';
import { Card, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import { message } from 'antd';
import PageLayout from 'src/components/PageLayout';
import { listVideos } from 'src/apis/kv';
import VideoPlayerModal from 'src/components/VideoPlayerModal';
import { PlayCircleFilled } from '@ant-design/icons';
import { checkAndSignAuthMessage, getSignedToken } from 'src/helpers/lit';

import LibraryPageStyle from './style';
import { Video } from 'src/interfaces/kv';

const LibraryPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('');
  const [selectedVideoName, setSelectedVideoName] = useState<string>('');
  const [selectedJwt, setSelectedJwt] = useState<string>('');

  const fetchVideos = async () => {
    try {
      const data = await listVideos();
      setVideos(data);
    } catch (err) {
      console.error(err);
      message.error('cannot fetch videos');
    }
  };

  const watch = async (video: Video) => {
    const { resourceId, accessControlConditions, videoId } = video;
    const extra = JSON.parse(resourceId.extraData);
    const { chain } = accessControlConditions[0];
    const authSig = await checkAndSignAuthMessage({ chain });
    const jwt = await getSignedToken({
      accessControlConditions,
      chain,
      authSig,
      resourceId,
    });

    setSelectedJwt(jwt);
    setSelectedVideoId(videoId);
    setSelectedVideoName(extra.name);
    setIsModalVisible(true);
  };

  const closeVideoModal = () => {
    setSelectedJwt('');
    setSelectedVideoId('');
    setSelectedVideoName('');
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <LibraryPageStyle>
      <PageLayout>
        <div className='header'>
          <Title level={2}>Video Library</Title>
        </div>

        <VideoPlayerModal
          jwt={selectedJwt}
          videoName={selectedVideoName}
          videoId={selectedVideoId}
          open={isModalVisible}
          onClose={closeVideoModal}
        />

        <div className='video-container'>
          {videos.map((video, idx) => {
            const extra = JSON.parse(video.resourceId.extraData);
            const style =
              videos.length - 1 === idx ? { marginRight: 'auto' } : {};

            return (
              <Col
                key={video.videoId}
                className='video-content'
                xs={16}
                sm={16}
                md={10}
                lg={10}
                xl={10}
              >
                <Card
                  key={video.videoId}
                  title={extra.name}
                  // TODO: Implement delete
                  // extra={<a href='#'>More</a>}
                  style={style}
                >
                  <div className='card-content'>
                    <PlayCircleFilled
                      onClick={() => watch(video)}
                      style={{ fontSize: '150px', cursor: 'pointer' }}
                    />
                  </div>
                </Card>
              </Col>
            );
          })}
        </div>
      </PageLayout>
    </LibraryPageStyle>
  );
};

export default LibraryPage;
