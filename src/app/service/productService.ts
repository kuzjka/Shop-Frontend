import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Type} from "../model/type";
import {Brand} from "../model/brand";
import {ResponseProductDto} from "../dto/ResponseProductDto";
import {TypeDto} from "../dto/typeDto";
import {BrandDto} from "../dto/brandDto";

@Injectable()
export class ProductService {
  private readonly headers;
  fileArray!: File[];

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    });
  }

  baseUrl: string = 'http://localhost:8080';

  setFiles(file: FileList) {
    this.fileArray = Array.from(file);
  }

  deleteFiles() {
    this.fileArray = [];
  }

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

  addProduct(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('productId', data.controls.productId.value);
    formData.append('typeId', data.controls.typeId.value);
    formData.append('brandId', data.controls.brandId.value);
    formData.append('name', data.controls.name.value);
    formData.append('price', data.controls.price.value);
    return this.http.post<any>(this.baseUrl +
      '/api/product', formData, {headers: this.headers});
  }

  addPhoto(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('productId', data.controls.productId.value);
    for (let i = 0; i < this.fileArray.length; i++) {
      formData.append('photos', this.fileArray[i]);
    }
    this.deleteFiles();
    return this.http.post<any>(this.baseUrl +
      '/api/photo', formData, {headers: this.headers});
  }

  editProduct(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('productId', data.controls.productId.value);
    formData.append('typeId', data.controls.typeId.value);
    formData.append('brandId', data.controls.brandId.value);
    formData.append('name', data.controls.name.value);
    formData.append('price', data.controls.price.value);
    return this.http.put<any>(this.baseUrl
      + '/api/product', formData, {headers: this.headers});
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

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/product/' + productId, {headers: this.headers});
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/photo/' + photoId, {headers: this.headers});
  }

  deleteType(typeId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/type/' + typeId, {headers: this.headers});
  }

  deleteBrand(brandId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/brand/' + brandId, {headers: this.headers});
  }
}
