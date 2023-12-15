import {CartItem} from "./cartItem";

export interface Cart {
  id: number;
  cartItems: CartItem[];
}
