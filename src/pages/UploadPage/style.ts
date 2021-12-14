import styled from 'styled-components';

const UploadPageStyle = styled.div`
  .header {
    text-align: center;
    margin-bottom: 24px;
  }

  .box {
    background-color: white;
    padding: 24px;
    margin: 16px 0px;

    border-radius: 1em;
    box-shadow: 2px 2px 8px 2px #e1e1e1;
  }

  .ant-steps-item-title {
    font-weight: bold;
  }

  .ant-select {
    width: 100%;

    .ant-select-selector {
      height: 50px;
      display: flex;
      align-items: center;
      font-weight: bold;
    }
  }

  .ant-space {
    width: 100%;
  }

  .ant-input {
    height: 40px;
  }

  .ant-steps-item-content {
    padding: 0px 8px;
  }

  .ant-alert {
    border-radius: 12px;
  }

  .steps-content {
    min-height: 200px;
    margin-top: 16px;
    text-align: center;
    background-color: #fafafa;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .steps-action {
    margin-top: 24px;
  }
`;
export default UploadPageStyle;
