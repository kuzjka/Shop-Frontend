import {Injectable} from "@angular/core";
import {OAuthService} from "angular-oauth2-oidc";
import {UserService} from "./userService";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oAuthService: OAuthService,
              private userService: UserService) {
    // this.oAuthService.configure(authConfig);
    // this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oAuthService.initCodeFlow();

  }

  logout() {
    this.oAuthService.logOut();
  }
}
