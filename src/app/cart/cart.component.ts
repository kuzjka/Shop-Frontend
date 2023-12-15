import {Component, OnInit} from '@angular/core';
import {CartItemDto} from "../dto/cartItemDto";
import {OrderService} from "../orderService";
import {Cart} from "../model/cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dto: CartItemDto;
  cart!: Cart;

  constructor(private service: OrderService) {
    this.dto = new CartItemDto(0, 0, 0, 0);
  }

  getCart() {
    this.service.getCart().subscribe(data => {
      this.cart = data;
      this.dto.cartId = data.id;
      // this.dto.cartItemId = data.cartItems[0].id;

    })

  }

  ngOnInit(): void {
    this.getCart();
  }

}
