import {Cart} from "./cart";

export interface Order{
  cart:Cart;
  uuid:string;
}
