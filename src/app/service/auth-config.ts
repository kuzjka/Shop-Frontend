import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {

  issuer: 'http://localhost:8080',

  redirectUri: 'http://localhost:4200',

  clientId: 'app-client',
  responseType: 'code',
  scope: 'openid',
  requireHttps: false

};
