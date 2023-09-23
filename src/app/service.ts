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
import {TypeDto} from "./typeDto";
import {BrandDto} from "./brandDto";

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

  getProducts(typeId: number, brandIds: number[], sort: string, dir: string, page: number, size: number):
    Observable<ResponseProductDto> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<ResponseProductDto>(this.baseUrl + '/api/product?typeId=' + typeId + '&brandIds='
      + brandIds + '&sort=' + sort + '&dir=' + dir + '&page=' + page + '&size=' + size, {headers: headers});
  }

  getAllTypes(): Observable<Type[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Type[]>(this.baseUrl + '/api/type', {headers: headers});
  }

  getAllBrands(): Observable<Brand[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Brand[]>(this.baseUrl + '/api/brand', {headers: headers});
  }

  getProductTypes(): Observable<Type[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Type[]>(this.baseUrl + '/api/productType', {headers: headers});
  }

  getProductBrands(typeId: number): Observable<Brand[]> {
    const tokenHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.get<Brand[]>(this.baseUrl + '/api/productBrand?typeId=' + typeId, {headers: tokenHeaders});
  }

  addProduct(dto: ProductDto): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.post<any>(this.baseUrl + '/api/product', dto, {headers: headers});
  }

  addType(dto: TypeDto): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.post<any>(this.baseUrl + '/api/type', dto, {headers: headers});
  }

  addBrand(dto: BrandDto): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.post<any>(this.baseUrl + '/api/brand', dto, {headers: headers});
  }

  editType(dto: TypeDto): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.put<any>(this.baseUrl + '/api/type', dto, {headers: headers});
  }

  editBrand(dto: BrandDto): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.put<any>(this.baseUrl + '/api/brand', dto, {headers: headers});
  }

  editProduct(dto: ProductDto): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.put<any>(this.baseUrl + '/api/product', dto, {headers: headers});
  }

  deleteProduct(productId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.delete<any>(this.baseUrl + '/api/product/' + productId, {headers: headers});
  }

  deleteType(typeId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.delete<any>(this.baseUrl + '/api/type/' + typeId, {headers: headers});
  }

  deleteBrand(brandId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
    return this.http.delete<any>(this.baseUrl + '/api/brand/' + brandId, {headers: headers});
  }
}
