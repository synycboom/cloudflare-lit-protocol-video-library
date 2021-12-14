import axios from 'axios';
import setting from 'src/setting';
import { Authentication } from 'src/interfaces/authentication';
import { PresignedURL, VideoInfoResponse } from 'src/interfaces/video';
import { getAuthenticationHeader } from './util';

export const getPresignedURL = async (jwt: string, auth: Authentication) => {
  const headers = getAuthenticationHeader(auth);
  const url = `${setting.API_URL}/videos/presigned-url`;
  const response = await axios.get<PresignedURL>(url, {
    headers: {
      ...headers,
      'X-LIT-JWT': jwt,
    },
  });

  return response.data;
};

export const getVideoInfo = async (videoId: string, auth: Authentication) => {
  const headers = getAuthenticationHeader(auth);
  const url = `${setting.API_URL}/videos/${videoId}`;
  const response = await axios.get<VideoInfoResponse>(url, {
    headers: { ...headers },
  });

  return response.data;
};
