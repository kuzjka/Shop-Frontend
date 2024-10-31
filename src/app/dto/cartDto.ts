export class CartDto {
  productId: number;
  cartId: number;
  quantity: number;


  constructor(productId: number, cartId: number, quantity: number) {
    this.productId = productId;
    this.cartId = cartId;
    this.quantity = quantity;
  }
}
