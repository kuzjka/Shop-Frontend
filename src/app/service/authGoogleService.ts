import {Injectable} from "@angular/core";
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth-config";
import {UserService} from "./userService";


@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService,
              private userService: UserService) {
    this.initConfiguration();
  }

  initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken()) {
        this.userService.saveToken(this.oAuthService.getIdToken());
      }
    });
  }

  login() {
    this.oAuthService.initCodeFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }
}
