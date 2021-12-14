import { AccessControlCondition } from './accessControl';

export type ResourceId = {
  baseUrl: string;
  path: string;
  orgId: string;
  role: string;
  extraData: string;
};

export type Video = {
  accessControlConditions: AccessControlCondition[];
  resourceId: ResourceId;
  videoId: string;
  wallet: string;
};

export type KVVideoResponse = {
  data: Video[];
};
