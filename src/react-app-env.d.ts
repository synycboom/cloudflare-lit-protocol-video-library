/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: any[]) => Promise<void>;
  };
  BinanceChain?: {
    bnbSign?: (
      address: string,
      message: string
    ) => Promise<{ publicKey: string; signature: string }>;
  };
}

declare module 'lit-access-control-conditions-modal';
declare module 'lit-js-sdk';
