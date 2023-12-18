import {CartItem} from "./cartItem";

export interface Cart {
  id: number;
  totalPrice: number;
  items: CartItem[];
}
