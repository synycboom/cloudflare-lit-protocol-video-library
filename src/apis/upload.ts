import axios from 'axios';
import setting from 'src/setting';
import { OneTimeUpload } from 'src/interfaces/upload';
import { Authentication } from 'src/interfaces/authentication';
import { getAuthenticationHeader } from 'src/apis/util';

export const getOneTimeUpload = async (auth: Authentication) => {
  const url = `${setting.API_URL}/upload/link`;
  const headers = getAuthenticationHeader(auth);
  const response = await axios.get<OneTimeUpload>(url, {
    headers: {
      ...headers,
    },
  });

  return response.data;
};

export const uploadFile = async (url: string, file: File) => {
  const form = new FormData();
  form.append('file', file);
  const response = await axios.post(url, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
