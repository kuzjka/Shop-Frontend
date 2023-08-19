import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Token} from "./token";
import {CookieService} from "ngx-cookie-service";
import {Type} from "./type";
import {Brand} from "./brand";
import {ProductDto} from "./productDto";
import {RegisterDto} from "./registerDto";
import {ResponseProductDto} from "./ResponseProductDto";

@Injectable()
export class Service {
  constructor(private http: HttpClient, private cookies: CookieService) {
  }

  baseUrl: string = 'http://localhost:8080';

  checkCredentials() {
    return this.cookies.check('access_token');
  }

  register(dto: RegisterDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/register', dto);
  }

  retrieveToken(code: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('app-client:app-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    });
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);

    this.http.post<Token>(this.baseUrl + '/oauth2/token', params, {headers: headers})
      .subscribe(data => {
        this.saveToken(data);
      })
  }

  saveToken(token: Token) {
    let expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookies.set("access_token", token.access_token, expireDate);

    window.location.href = 'http://localhost:4200';
  }

  getProducts(typeId: number, brandId: number, sort: string, dir: string, page: number, size: number):
    Observable<ResponseProductDto> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<ResponseProductDto>(this.baseUrl + '/api/product?typeId=' + typeId + '&brandId='
      + brandId + '&sort=' + sort + '&dir=' + dir + '&page=' + page + '&size=' + size, {headers: tokenHeaders});
  }

  getAllTypes(): Observable<Type[]> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Type[]>(this.baseUrl + '/api/type', {headers: tokenHeaders});
  }

  getAllBrands(): Observable<Brand[]> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Brand[]>(this.baseUrl + '/api/brand', {headers: tokenHeaders});
  }

  getProductTypes(): Observable<Type[]> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Type[]>(this.baseUrl + '/api/productType', {headers: tokenHeaders});
  }

  getProductBrands(typeId: number): Observable<Brand[]> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Brand[]>(this.baseUrl + '/api/productBrand?typeId=' + typeId, {headers: tokenHeaders});
  }

  addProduct(dto: ProductDto): Observable<any> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.post<any>(this.baseUrl + '/api/product', dto, {headers: tokenHeaders});
  }

  editProduct(dto: ProductDto): Observable<any> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.put<any>(this.baseUrl + '/api/product', dto, {headers: tokenHeaders});
  }

  deleteProduct(productId: number): Observable<any> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.delete<any>(this.baseUrl + '/api/product/' + productId, {headers: tokenHeaders});
  }
}
