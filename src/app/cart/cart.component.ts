import {Component, OnInit} from '@angular/core';
import {CartDto} from "../dto/cartDto";
import {OrderService} from "../service/orderService";
import {Cart} from "../model/cart";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts!: Cart[];
  dto!:CartDto;

  constructor(private orderService: OrderService) {
    this.dto = new CartDto(0, 0, 0);
  }

  getCart() {
    this.carts = [];
    this.orderService.getCart().subscribe(data => {
      this.carts = data;

    });
  }

  addToCart(productId: number) {
    this.dto.productId = productId;
    this.dto.cartId = 0;
    this.orderService.addCart(this.dto).subscribe(data => {
      this.getCart();
    })
  }

  plusItem(cartId: number) {
    this.dto.quantity = 1;

    this.dto.cartId = cartId;
    this.orderService.addCart(this.dto).subscribe(data => {
      this.getCart();
    });
  }

  minusItem(cartId: number) {
    this.dto.quantity = -1;

    this.dto.cartId = cartId;
    this.orderService.addCart(this.dto).subscribe(data => {
      this.getCart();
    });
  }



  ngOnInit(): void {
    this.getCart();
  }

}
