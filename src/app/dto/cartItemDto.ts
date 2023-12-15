import {CartItem} from "../model/cartItem";

export class CartItemDto {
  cartId: number;
  cartItemId: number;
  productId: number;
  quantity: number;


  constructor(cartId: number, cartItemId: number, productId: number, quantity: number) {
    this.cartId = cartId;
    this.cartItemId = cartItemId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
