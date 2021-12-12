import axios from 'axios';
import setting from 'src/setting';
import { OneTimeUpload } from 'src/interfaces/upload';

export const getOneTimeUpload = async () => {
  const url = `${setting.API_URL}/upload/one-time-upload`;
  const response = await axios.get<OneTimeUpload>(url);

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
