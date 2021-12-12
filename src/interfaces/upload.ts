type Result = {
  uploadURL: string;
  uid: string;
};

type Message = {
  code: string;
  message: string;
};

export type OneTimeUpload = {
  success: boolean;
  result: Result;
  errors: Message[];
  messages: Message[];
};
