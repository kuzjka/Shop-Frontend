import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Type} from "../model/type";
import {Brand} from "../model/brand";
import {ResponseProductDto} from "../dto/ResponseProductDto";

@Injectable()
export class ProductService {
  fileArray!: File[];
  baseUrl: string = 'http://localhost:8080';
  private readonly headers;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token')
    });
  }

  setFiles(file: FileList) {
    this.fileArray = Array.from(file);
  }

  deleteFiles() {
    this.fileArray = [];
  }

  getAllTypes(dir: string | undefined,
              sort: string | undefined): Observable<Type[]> {
    let params = new HttpParams();
    params = dir == undefined ? params : params.set('dir', dir);
    params = sort == undefined ? params : params.set('sort', sort);
    return this.http.get<Type[]>(`${this.baseUrl}/products/type`, {params: params});
  }

  getProductTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.baseUrl}/products/productType`);
  }

  getAllBrands(typeId: number | undefined,
               dir: string | undefined,
               sort: string | undefined): Observable<Brand[]> {
    let params = new HttpParams();
    params = typeId == undefined ? params : params.set('typeId', typeId);
    params = dir == undefined ? params : params.set('dir', dir);
    params = sort == undefined ? params : params.set('sort', sort);
    return this.http.get<Brand[]>(`${this.baseUrl}/products/brand`, {params: params});
  }

  getProducts(typeId: number | undefined,
              brandId: number | undefined,
              sort: string | undefined,
              dir: string | undefined,
              page: number | undefined,
              size: number | undefined): Observable<ResponseProductDto> {
    let params = new HttpParams();

    params = sort == undefined ? params : params.set('sort', sort);
    params = dir == undefined ? params : params.set('dir', dir);
    params = typeId == undefined ? params : params.set('typeId', typeId);
    params = brandId == undefined ? params : params.set('brandId', brandId);
    params = page == undefined ? params : params.set('page', page);
    params = size == undefined ? params : params.set('size', size);
    return this.http.get<ResponseProductDto>(`${this.baseUrl}/products/product`, {params: params});
  }

  addProduct(data: any): Observable<any> {
    const formData = new FormData();
    formData.append("typeId", data.controls.typeId.value);
    formData.append("brandId", data.controls.brandId.value);
    formData.append("name", data.controls.name.value);
    formData.append("price", data.controls.price.value);
    return this.http.post<any>(this.baseUrl +
      '/products/product', formData, {headers: this.headers});
  }

  editProduct(data: any): Observable<any> {
    const formData = new FormData();

    formData.append("id", data.controls.id.value);
    formData.append("typeId", data.controls.typeId.value);
    formData.append("brandId", data.controls.brandId.value);
    formData.append("name", data.controls.name.value);
    formData.append("price", data.controls.price.value);
    return this.http.put<any>(this.baseUrl + '/products/product', formData, {headers: this.headers});
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/products/product/' + productId, {headers: this.headers});
  }

  addType(data: any): Observable<any> {
    const formData = new FormData();
    formData.append("name", data.controls.name.value);
    return this.http.post<any>(this.baseUrl + '/products/type', formData, {headers: this.headers});
  }

  editType(data: any): Observable<any> {
    const formData = new FormData();
    formData.append("id", data.controls.id.value);
    formData.append("name", data.controls.name.value);
    return this.http.put<any>(this.baseUrl + '/products/type', formData, {headers: this.headers});
  }

  deleteType(typeId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/products/type/' + typeId, {headers: this.headers});
  }

  addBrand(data: any): Observable<any> {
    const formData = new FormData();
    formData.append("name", data.controls.name.value);
    return this.http.post<any>(this.baseUrl + '/products/brand', formData, {headers: this.headers});
  }

  editBrand(data: any): Observable<any> {
    const formData = new FormData();
    formData.append("id", data.controls.id.value);
    formData.append("name", data.controls.name.value);
    return this.http.put<any>(this.baseUrl + '/products/brand', formData, {headers: this.headers});
  }

  deleteBrand(brandId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/products/brand/' + brandId, {headers: this.headers});
  }

  addPhoto(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('productId', data.controls.productId.value);
    for (let i = 0; i < this.fileArray.length; i++) {
      formData.append('photos', this.fileArray[i]);
    }
    this.deleteFiles();
    return this.http.post<any>(this.baseUrl +
      '/products/photo', formData, {headers: this.headers});
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/products/photo/' + photoId, {headers: this.headers});
  }
}
