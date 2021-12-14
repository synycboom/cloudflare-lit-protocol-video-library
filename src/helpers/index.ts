import { Profile } from 'src/state/profile';
import { Authentication } from 'src/interfaces/authentication';

export const serializeQueryString = (obj: Record<string, string>) => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const setRedirectUrl = () => {
  window.localStorage.setItem('redirectUrl', window.location.pathname);
};

export const getRedirectUrl = () => {
  return window.localStorage.getItem('redirectUrl');
};

export const getAuthentication = (profile: Profile): Authentication | null => {
  let auth: Authentication | null = null;
  if (profile.idToken) {
    auth = {
      jwt: profile.idToken.__raw,
      nonce: profile.idToken.nonce || '',
    };
  }
  if (profile.metamask) {
    auth = {
      address: profile.walletAddress,
      message: profile.metamask.message,
      signature: profile.metamask.signature,
    };
  }

  return auth;
};
