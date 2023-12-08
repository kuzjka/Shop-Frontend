import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Username} from "./username";
import {UserDto} from "./userDto";
import {RegistrationResponse} from "./registrationResponse";
import {Token} from "./token";

@Injectable()
export class UserService {
  private readonly headers;
  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
  }

  checkCredentials() {
    return this.cookies.check('access_token');
  }

  getUser(): Observable<Username> {
    return this.http.get<Username>(this.baseUrl + '/user', {headers: this.headers});
  }

  register(dto: UserDto): Observable<RegistrationResponse> {
    return this.http.post<any>(this.baseUrl + '/register', dto);
  }

  resendRegistrationToken(token: string): Observable<RegistrationResponse> {
    return this.http.get<RegistrationResponse>(this.baseUrl + '/resendRegistrationToken?token=' + token);
  }

  retrieveToken(code: string) {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('app-client:app-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    });
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', 'http://localhost:4200');
    params.append('code', code);
    this.http.post<Token>(this.baseUrl + '/oauth2/token', params, {headers: tokenHeaders})
      .subscribe(data => {
        this.saveToken(data);
      })
  }

  saveToken(token: Token) {
    let expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookies.set("access_token", token.access_token, expireDate);
    window.location.href = 'http://localhost:4200/';
  }
}
