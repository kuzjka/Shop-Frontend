import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../dto/userDto";
import {SuccessResponse} from "../model/successResponse";
import {Token} from "../model/token";
import {UserInfo} from "../dto/userInfo";

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  /**
   * Generates PKCE verifier.
   * Verifier is stored in local storage, so it is available after redirect.
   */
  generatePkce() {
    const verifier = new Uint8Array(32);
    crypto.getRandomValues(verifier);
    localStorage.setItem("pkce_verifier", this.encodeBase64Url(verifier));
  }

  /**
   * Calculates and gets PKCE challenge (SHA-256 method).
   */
  async getPkceChallenge(): Promise<string> {
    const verifier = this.getPkceVerifier();
    const encoded = new TextEncoder().encode(verifier);
    const challengeBytes = await crypto.subtle.digest('SHA-256', encoded);
    return this.encodeBase64Url(challengeBytes);
  }

  /**
   * Gets PKCE verifier value.
   */
  getPkceVerifier(): string {
    const verifier = localStorage.getItem("pkce_verifier");
    if (!verifier) throw new Error("PKCE verifier was not generated");
    return verifier;
  }

  /**
   * Encodes binary data to URL-safe Base64 without padding (RFC 4648, section 5)
   * @param buffer  Binary data to encode
   * @returns       Base64URL-encoded string
   */
  private encodeBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const binary = bytes
      .reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64 = btoa(binary);
    return this.toBase64Url(base64);
  }

  /**
   * Converts 'basic' Base64 (RFC 4648, section 4) to URL-safe Base64 without padding (RFC 4648, section 5)
   * @param base64  'Basic' Base64
   */
  private toBase64Url(base64: string): string {
    return base64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkCredentials() {
    return localStorage.getItem('token') != null;
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  clearData() {
    localStorage.clear();
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
    params.append('client_id', 'app-client');
    params.append('redirect_uri', 'http://localhost:4200');
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('code_verifier', this.getPkceVerifier());
    this.http.post<Token>(this.baseUrl + '/oauth2/token', params, {headers: tokenHeaders})
      .subscribe(data => {
          this.saveToken(data.access_token);
          window.location.href = '/products';
        }
      )
  }
}
