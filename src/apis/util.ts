import { AxiosRequestHeaders } from 'axios';
import { Authentication } from 'src/interfaces/authentication';

export const getAuthenticationHeader = (auth: Authentication) => {
  const headers: AxiosRequestHeaders = {};
  if ('jwt' in auth) {
    headers['X-AUTH-JWT'] = auth.jwt;
    headers['X-AUTH-NONCE'] = auth.nonce;
  }
  if ('signature' in auth) {
    headers['X-AUTH-WALLET'] = auth.address;
    headers['X-AUTH-MESSAGE'] = auth.message;
    headers['X-AUTH-SIGNATURE'] = auth.signature;
  }

  return headers;
};
