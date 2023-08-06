import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Product} from "./product";
import {Token} from "./token";
import {CookieService} from "ngx-cookie-service";
import {Type} from "./type";
import {Brand} from "./brand";
import {ProductDto} from "./productDto";

@Injectable()
export class Service {

  constructor(private http: HttpClient, private cookies: CookieService) {
  }

  baseUrl: string = 'http://localhost:8080';

  login(data: HttpParams): Observable<Token> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('app-client:secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Token>(this.baseUrl + '/oauth2/token', data, {headers: headers});
  }
  checkCredentials(){
    return this.cookies.check('token');
  }
  retrieveToken(code:string):Observable<Token>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('app-client:secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    });
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);


    return this.http.post<Token>(this.baseUrl + '/oauth2/token', params, {headers: headers});
  }

  getProducts(typeId: number, brandId: number): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('token'),
    });
    return this.http.get<Product[]>(this.baseUrl + '/product?typeId=' + typeId + '&brandId=' + brandId, {headers: headers});
  }

  getTypes(): Observable<Type[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('token'),
    });
    return this.http.get<Type[]>(this.baseUrl + '/type', {headers: headers});
  }

  getBrands(typeId: number): Observable<Brand[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('token'),
    });
    return this.http.get<Brand[]>(this.baseUrl + '/brand?typeId=' + typeId, {headers: headers});
  }

  addProduct(dto: ProductDto): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookies.get('token'),
    });
    return this.http.post<any>(this.baseUrl + '/product', dto, {headers: headers})
  }

  editProduct(dto: ProductDto): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookies.get('token'),
    });
    return this.http.put<any>(this.baseUrl + '/product', dto, {headers: headers})
  }
}
