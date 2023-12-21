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
  dto!: CartItemDto;
  cart!: Cart;


  constructor(private service: OrderService) {
    this.dto = new CartItemDto(0, 0);
  }

  getCart() {
    this.service.getCart().subscribe(data => {
      this.cart = data;
    })
  }

  plusItem(id: number) {
    this.dto.quantity = 1;
    this.dto.productId = id;
    this.service.addCartItem(this.dto).subscribe(data => {
      this.cart = data;
    })
  }

  minusItem(id: number) {
    this.dto.quantity = -1;
    this.dto.productId = id;
    this.service.addCartItem(this.dto).subscribe(data => {
      this.cart = data;
    })
  }

  ngOnInit(): void {
    this.getCart();
  }

}
