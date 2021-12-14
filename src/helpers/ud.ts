import UAuth from '@uauth/js';
import setting from 'src/setting';

console.log(`${setting.APP_URL}/callback`);
console.log(`${setting.APP_URL}`);
export default () => {
  return new UAuth({
    clientID: setting.UNSTOPPABLEDOMAIN_CLIENT_ID,
    clientSecret: setting.UNSTOPPABLEDOMAIN_CLIENT_SECRET,
    scope: 'openid email wallet',
    redirectUri: `${setting.APP_URL}/callback`,
    postLogoutRedirectUri: `${setting.APP_URL}`,
  });
};
