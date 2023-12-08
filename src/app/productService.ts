import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Type} from "./type";
import {Brand} from "./brand";
import {ProductDto} from "./productDto";
import {ResponseProductDto} from "./ResponseProductDto";
import {TypeDto} from "./typeDto";
import {BrandDto} from "./brandDto";


@Injectable()
export class ProductService {
  private readonly headers;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
  }

  baseUrl: string = 'http://localhost:8080';

  getProducts(typeId: number, brandId: number, sort: string, dir: string, page: number, size: number):
    Observable<ResponseProductDto> {
    return this.http.get<ResponseProductDto>(this.baseUrl + '/api/product?typeId=' + typeId + '&brandId='
      + brandId + '&sort=' + sort + '&dir=' + dir + '&page=' + page + '&size=' + size, {headers: this.headers});
  }

  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + '/api/type', {headers: this.headers});
  }

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + '/api/brand', {headers: this.headers});
  }

  getProductTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + '/api/productType', {headers: this.headers});
  }

  getProductBrands(typeId: number): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + '/api/productBrand?typeId=' + typeId, {headers: this.headers});
  }

  addProduct(dto: ProductDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/product', dto, {headers: this.headers});
  }

  addType(dto: TypeDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/type', dto, {headers: this.headers});
  }

  addBrand(dto: BrandDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/brand', dto, {headers: this.headers});
  }

  editType(dto: TypeDto): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/type', dto, {headers: this.headers});
  }

  editBrand(dto: BrandDto): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/brand', dto, {headers: this.headers});
  }

  editProduct(dto: ProductDto): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/product', dto, {headers: this.headers});
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/product/' + productId, {headers: this.headers});
  }

  deleteType(typeId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/type/' + typeId, {headers: this.headers});
  }

  deleteBrand(brandId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/brand/' + brandId, {headers: this.headers});
  }
}
