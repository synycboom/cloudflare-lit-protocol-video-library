import axios from 'axios';
import setting from 'src/setting';
import { AccessControlCondition } from 'src/interfaces/accessControl';

export const addVideo = async (
  videoId: string,
  accessControlConditions: AccessControlCondition[],
  resourceId: any
) => {
  const url = `${setting.API_URL}/kv/videos`;
  const response = await axios.post(url, {
    videoId,
    accessControlConditions,
    resourceId,
  });

  return response.data;
};

export const listVideos = async () => {
  const url = `${setting.API_URL}/kv/videos`;
  const response = await axios.post(url);

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
