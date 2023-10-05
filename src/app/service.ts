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
import {RegistrationResponse} from "./registrationResponse";

@Injectable()
export class Service {
  private readonly headers2;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers2 = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
  }

  baseUrl: string = 'http://localhost:8080';

  checkCredentials() {
    return this.cookies.check('access_token');
  }

  register(dto: RegisterDto): Observable<RegistrationResponse> {
    return this.http.post<any>(this.baseUrl + '/register', dto);
  }

  retrieveToken(code: string) {
    const headers1 = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('app-client:app-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    });
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    this.http.post<Token>(this.baseUrl + '/oauth2/token', params, {headers: headers1})
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
    return this.http.get<ResponseProductDto>(this.baseUrl + '/api/product?typeId=' + typeId + '&brandIds='
      + brandIds + '&sort=' + sort + '&dir=' + dir + '&page=' + page + '&size=' + size, {headers: this.headers2});
  }

  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + '/api/type', {headers: this.headers2});
  }

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + '/api/brand', {headers: this.headers2});
  }

  getProductTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + '/api/productType', {headers: this.headers2});
  }

  getProductBrands(typeId: number): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + '/api/productBrand?typeId=' + typeId, {headers: this.headers2});
  }

  addProduct(dto: ProductDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/product', dto, {headers: this.headers2});
  }

  addType(dto: TypeDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/type', dto, {headers: this.headers2});
  }

  addBrand(dto: BrandDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/brand', dto, {headers: this.headers2});
  }

  editType(dto: TypeDto): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/type', dto, {headers: this.headers2});
  }

  editBrand(dto: BrandDto): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/brand', dto, {headers: this.headers2});
  }

  editProduct(dto: ProductDto): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/product', dto, {headers: this.headers2});
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/product/' + productId, {headers: this.headers2});
  }

  deleteType(typeId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/type/' + typeId, {headers: this.headers2});
  }

  deleteBrand(brandId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/brand/' + brandId, {headers: this.headers2});
  }
}
