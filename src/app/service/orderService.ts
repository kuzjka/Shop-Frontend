import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemDto} from "../dto/itemDto";

import {CookieService} from "ngx-cookie-service";
import {Item} from "../model/item";
import {Cart} from "../model/cart";
import {CartDto} from "../dto/cartDto";

@Injectable()
export class OrderService {
  baseUrl: string = 'http://localhost:8080';
  private readonly headers;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
  }

  getItem(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + '/order', {headers: this.headers});
  }

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl + '/order/order', {headers: this.headers});
  }

  addCart(dto: CartDto): Observable<any> {
    return this.http.post<Item>(this.baseUrl + '/order/order', dto, {headers: this.headers});
  }

  addItem(dto: ItemDto): Observable<Item> {
    return this.http.post<Item>(this.baseUrl + '/order', dto, {headers: this.headers});
  }

  editCartItem(dto: ItemDto): Observable<Item> {
    return this.http.put<Item>(this.baseUrl + '/order', dto, {headers: this.headers});
  }

  removeItem(itemId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/order?itemId=' + itemId, {headers: this.headers});
  }
}
