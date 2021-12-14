import { atom } from 'recoil';
import { Authorization } from '@uauth/js';

export type LoginWithMetamask = {
  signature: string;
  message: string;
};

export type Profile = {
  walletAddress: string;
  email: string;
  ud: string;
  idToken: Authorization['idToken'] | null;
  metamask: LoginWithMetamask | null;
};

export const DEFAULT_PROFILE: Profile = {
  walletAddress: '',
  email: '',
  ud: '',
  idToken: null,
  metamask: null,
};

export const profileState = atom({
  key: 'profileState',
  default: DEFAULT_PROFILE,
});
