import axios from 'axios';
import setting from 'src/setting';
import { AccessControlCondition } from 'src/interfaces/accessControl';
import { KVVideoResponse } from 'src/interfaces/kv';
import { Authentication } from 'src/interfaces/authentication';
import { getAuthenticationHeader } from './util';

export const addVideo = async (
  videoId: string,
  accessControlConditions: AccessControlCondition[],
  resourceId: any,
  auth: Authentication
) => {
  const headers = getAuthenticationHeader(auth);
  const url = `${setting.API_URL}/kv/videos`;
  const response = await axios.post(
    url,
    {
      videoId,
      accessControlConditions,
      resourceId,
    },
    {
      headers: {
        ...headers,
      },
    }
  );

  return response.data;
};

export const listVideos = async () => {
  const url = `${setting.API_URL}/kv/videos`;
  const response = await axios.get<KVVideoResponse>(url);

  return response.data.data;
};
