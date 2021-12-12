import axios from 'axios';
import setting from 'src/setting';
import { PresignedURL } from 'src/interfaces/video';

export const getPresignedURL = async (videoId: string) => {
  const url = `${setting.API_URL}/videos/${videoId}`;
  const response = await axios.get<PresignedURL>(url);

  return response.data;
};
