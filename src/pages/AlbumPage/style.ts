import styled from 'styled-components';

const LibraryPageStyle = styled.div`
  .header {
    text-align: center;
    margin-bottom: 24px;
  }
  .connect-wallet-container {
    display: flex;
    padding-bottom: 16px;
    justify-content: flex-end;
    .ant-btn {
      width: 240px;
    }
  }

  .ant-table-thead .ant-table-cell {
    font-weight: bold;
  }

  .video-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .video-content {
    margin: 10px;
  }

  .card-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default LibraryPageStyle;
