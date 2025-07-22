import {Injectable, OnInit} from "@angular/core";
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth-config";
import {filter, map, Observable} from "rxjs";



@Injectable({
  providedIn: 'root',
})
export class AuthService{

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }


}
