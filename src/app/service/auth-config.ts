import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {

  issuer: 'https://accounts.google.com',

  redirectUri: 'http://localhost:4200',

  clientId: '660020767759-1jfkvejafgf0lgv1pvio1912gk52piqm.apps.googleusercontent.com',

  scope: 'openid profile email',

  strictDiscoveryDocumentValidation: false

};
