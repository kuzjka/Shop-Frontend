import {Injectable} from "@angular/core";
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth-config";
import {filter, map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: Observable<boolean> | undefined;
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.isLoggedIn  = this.oauthService.events.pipe(filter(event => event.type === 'token_received'),
      map(this.oauthService.hasValidAccessToken));
  }


  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }


}
