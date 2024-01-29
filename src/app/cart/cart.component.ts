import {Component, OnInit} from '@angular/core';
import {CartItemDto} from "../dto/cartItemDto";
import {OrderService} from "../service/orderService";
import {Cart} from "../model/cart";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItemDto!: CartItemDto;
  cart!: Cart;
  cartProductsIds!: number[];

  constructor(private orderService: OrderService) {
    this.cartItemDto = new CartItemDto(0, 0, 0);
  }

  getCart() {
    this.cartProductsIds = [];
    this.orderService.getCart().subscribe(data => {
      this.cart = data;
      for (let i = 0; i < this.cart.items.length; i++) {
        this.cartProductsIds.push(this.cart.items[i].product.id);
      }
    });
  }
  addToCart(productId: number) {
    this.cartItemDto.productId = productId;
    this.orderService.addCartItem(this.cartItemDto).subscribe(data => {
      this.getCart();
    })
  }
  plusItem(itemId: number) {
    this.cartItemDto.quantity = 1;
    this.cartItemDto.productId = 0;
    this.cartItemDto.itemId = itemId;
    this.orderService.editCartItem(this.cartItemDto).subscribe(data => {
      this.getCart();
    });
  }

  minusItem(itemId: number) {
    this.cartItemDto.quantity = -1;
    this.cartItemDto.productId = 0;
    this.cartItemDto.itemId = itemId;
    this.orderService.editCartItem(this.cartItemDto).subscribe(data => {
      this.getCart();
    });
  }
  removeFromCart(id: number) {
    this.orderService.removeFromCart(id).subscribe(data => {
      this.getCart();
    })
  }
  ngOnInit(): void {
    this.getCart();
  }

}
