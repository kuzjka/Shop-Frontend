export class ItemDto {
  productId: number;
  cartId: number;
  itemId: number;
  quantity: number;


  constructor(productId: number, cartId: number, itemId: number, quantity: number) {
    this.productId = productId;
    this.cartId = cartId;
    this.itemId = itemId;
    this.quantity = quantity;
  }
}
