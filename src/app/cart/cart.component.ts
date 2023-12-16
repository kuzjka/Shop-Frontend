import {Component, OnInit} from '@angular/core';
import {CartItemDto} from "../dto/cartItemDto";
import {OrderService} from "../orderService";
import {CartItem} from "../model/cartItem";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dto: CartItemDto;
  cartItems!: CartItem[];

  constructor(private service: OrderService) {
    this.dto = new CartItemDto(0, 0, 0, 0);
  }

  getCart() {
    this.service.getCart().subscribe(data => {
      this.cartItems = data;
    })
  }

  ngOnInit(): void {
    this.getCart();
  }

}
