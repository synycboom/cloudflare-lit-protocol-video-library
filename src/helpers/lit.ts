import LitJsSdk from 'lit-js-sdk';

const litNodeClient = new LitJsSdk.LitNodeClient();

litNodeClient.connect();

export default litNodeClient;

export const checkAndSignAuthMessage = LitJsSdk.checkAndSignAuthMessage;

export const saveSigningCondition =
  litNodeClient.saveSigningCondition.bind(litNodeClient);

export const getSignedToken = litNodeClient.getSignedToken.bind(litNodeClient);
