export class CartItemDto {
  productId: number;
  itemId: number;
  quantity: number;


  constructor(productId: number, itemId: number, quantity: number) {
    this.productId = productId;
    this.itemId = itemId;
    this.quantity = quantity;
  }
}
