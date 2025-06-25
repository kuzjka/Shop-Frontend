import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080',
  redirectUri: window.location.origin,
  clientId: 'public-client',
  responseType: 'code',
  scope: 'openid'
};
