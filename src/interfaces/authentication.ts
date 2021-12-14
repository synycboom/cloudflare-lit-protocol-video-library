type UnstoppableAuth = {
  jwt: string;
  nonce: string;
};

type WalletAuth = {
  address: string;
  message: string;
  signature: string;
};

export type Authentication = UnstoppableAuth | WalletAuth;
