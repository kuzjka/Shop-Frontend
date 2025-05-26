import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {

  issuer: 'https://accounts.google.com',

  redirectUri: window.location.origin,

  clientId: '660020767759-1jfkvejafgf0lgv1pvio1912gk52piqm.apps.googleusercontent.com',

  scope: 'openid profile email',

  strictDiscoveryDocumentValidation: false

};
