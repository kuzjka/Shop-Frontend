import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../dto/userDto";
import {SuccessResponse} from "../model/successResponse";
import {Token} from "../model/token";
import {UserInfo} from "../dto/userInfo";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private cookie: CookieService) {
  }

  saveToken(token: string) {
    this.cookie.set('token', token);
  }

  setOidc() {
    this.cookie.set('oidc', 'true');
  }

  checkOidc() {
    return this.cookie.check('oidc');
  }

  getToken() {
    return this.cookie.get('token');
  }

  checkCredentials() {
    return this.cookie.check('token');
  }

  setRole(role: string) {
    this.cookie.set('role', role);
  }

  getRole() {
    return this.cookie.get('role');
  }

  clearData() {
    this.cookie.delete('token');
    this.cookie.delete('role');
    this.cookie.delete('oidc');
  }

  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl + '/user');
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
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    this.http.post<Token>(this.baseUrl + '/oauth2/token', params, {headers: tokenHeaders})
      .subscribe(data => {
        this.saveToken(data.access_token);
        window.location.href = '/';
      });
  }
}
