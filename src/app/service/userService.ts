import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {filter, map, Observable, Subject} from "rxjs";
import {UserDto} from "../dto/userDto";
import {SuccessResponse} from "../model/successResponse";
import {Token} from "../model/token";
import {UserInfo} from "../dto/userInfo";
import {OAuthService} from "angular-oauth2-oidc";
import {RoleInfo} from "../dto/roleInfo";


type LoginVariant = 'manual' | 'library';

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:8080';


  constructor(private http: HttpClient,
              private oauthService: OAuthService) {
      }

  setLoginVariant(variant: LoginVariant) {
    localStorage.setItem('loginVariant', variant);
  }

  getLoginVariant(): LoginVariant {
    const variant = localStorage.getItem('loginVariant');
    if (variant === 'library') {
      return variant;
    } else {
      return 'manual';
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    if (this.getLoginVariant() === 'library') {
      return this.oauthService.getAccessToken();
    }

    return localStorage.getItem('token');
  }

  checkCredentials(): boolean {
    return localStorage.getItem('token') != null;
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  fetchRole() {
    return localStorage.getItem('role');
  }

  clearData() {
    localStorage.clear();
  }

  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl + '/user');
  }
  getRole(): Observable<RoleInfo> {
    return this.http.get<RoleInfo>(this.baseUrl + '/user/role');
  }

  addUser(dto: UserDto): Observable<SuccessResponse> {
    return this.http.post<any>(this.baseUrl + '/user', dto);
  }

  editUser(dto: UserDto): Observable<SuccessResponse> {
    return this.http.put<any>(this.baseUrl + '/user', dto);
  }

  resendRegistrationToken(token: string): Observable<SuccessResponse> {
    return this.http.get<SuccessResponse>(this.baseUrl + '/user/resendRegistrationToken?token=' + token);
  }


  retrieveToken(code: string) {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('app-client:app-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    });
    let params = new URLSearchParams();
    params.append('redirect_uri', 'http://localhost:4200');
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    this.http.post<Token>(this.baseUrl + '/oauth2/token', params, {headers: tokenHeaders})
      .subscribe(data => {
          this.saveToken(data.access_token);
        }
      )
  }
}
