import { ethers } from 'ethers';

export const getSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum!);
  const signer = provider.getSigner(0);
  return signer;
};
