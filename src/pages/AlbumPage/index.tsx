import Title from 'antd/lib/typography/Title';
import PageLayout from 'src/components/PageLayout';

import AlbumPageStyle from './style';

const AlbumPage: React.FC = () => {
  return (
    <AlbumPageStyle>
      <PageLayout>
        <div className='header'>
          <Title level={2}>NFT Bridge Status</Title>
        </div>
        <Title level={4}>ERC-721</Title>
      </PageLayout>
    </AlbumPageStyle>
  );
};

export default AlbumPage;
