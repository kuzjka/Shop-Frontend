export class CartItemDto {

  cartItemId: number;
  productId: number;
  quantity: number;
  totalPrice: number;


  constructor(cartItemId: number, productId: number, quantity: number, totalPrice: number) {
    this.cartItemId = cartItemId;
    this.productId = productId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}
