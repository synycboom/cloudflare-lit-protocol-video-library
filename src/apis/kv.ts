import axios from 'axios';
import setting from 'src/setting';
import { AccessControlCondition } from 'src/interfaces/accessControl';
import { KVVideoResponse } from 'src/interfaces/kv';

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
  const response = await axios.get<KVVideoResponse>(url);

  return response.data.data;
};
