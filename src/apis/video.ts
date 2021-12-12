import axios from 'axios';
import setting from 'src/setting';
import { PresignedURL, VideoInfoResponse } from 'src/interfaces/video';

export const getPresignedURL = async (jwt: string) => {
  const url = `${setting.API_URL}/videos/presigned-url`;
  const response = await axios.post<PresignedURL>(url, {
    jwt,
  });

  return response.data;
};

export const getVideoInfo = async (videoId: string) => {
  const url = `${setting.API_URL}/videos/${videoId}`;
  const response = await axios.get<VideoInfoResponse>(url);

  return response.data;
};
