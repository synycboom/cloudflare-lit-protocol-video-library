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
