import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemDto} from "../dto/itemDto";

import {CookieService} from "ngx-cookie-service";
import {Cart} from "../model/cart";
import {Order} from "../model/order";

@Injectable()
export class OrderService {
  baseUrl: string = 'http://localhost:8080';
  private readonly headers;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
  }
  getItem(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl + '/order', {headers: this.headers});
  }
  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + '/order/order', {headers: this.headers});
  }
  addItem(dto: ItemDto): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl + '/order', dto, {headers: this.headers});
  }
  addOrder(): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/order/order', {}, {headers: this.headers});
  }
  editItem(dto: ItemDto): Observable<Cart> {
    return this.http.put<Cart>(this.baseUrl + '/order', dto, {headers: this.headers});
  }

  removeItem(itemId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/order?itemId=' + itemId, {headers: this.headers});
  }
}
