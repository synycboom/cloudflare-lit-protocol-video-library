type Result = {
  token: string;
};

type Message = {
  code: string;
  message: string;
};

export type PresignedURL = {
  success: boolean;
  result: Result;
  errors: Message[];
  messages: Message[];
};

type Meta = {
  name: string;
};

export type VideoInfo = {
  meta: Meta;
};

export type VideoInfoResponse = {
  success: boolean;
  result: VideoInfo;
  errors: Message[];
  messages: Message[];
};
