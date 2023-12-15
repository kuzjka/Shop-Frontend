import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartItemDto} from "./dto/cartItemDto";
import {Cart} from "./model/cart";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class OrderService {
  baseUrl: string = 'http://localhost:8080';
  private readonly headers;
  constructor(private http: HttpClient, private cookies: CookieService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookies.get('access_token'),
    })
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl + '/order', {headers:this.headers});
  }

  addCartItem(dto: CartItemDto): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl + '/order', dto, {headers:this.headers});
  }
}
