import {Cart} from "../model/cart";

export class OrderDto{
  cart:Cart;
  constructor(cart: Cart) {
    this.cart = cart;
  }
}
