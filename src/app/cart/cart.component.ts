import {Component, OnInit} from '@angular/core';
import {ItemDto} from "../dto/itemDto";
import {OrderService} from "../service/orderService";
import {Item} from "../model/item";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items!: Item[];
  itemDto!: ItemDto;

  constructor(private orderService: OrderService) {
    this.itemDto = new ItemDto(0, 0, 0, 0);
  }

  getCart() {
    this.items = [];
    this.orderService.getItem().subscribe(data => {
      this.items = data;

    });
  }

  removeFromCart(id: number) {
    this.orderService.removeItem(id).subscribe(data => {
      this.getCart();
    })
  }

  addToCart(productId: number) {
    this.itemDto.productId = productId;
    this.itemDto.itemId = 0;
    this.orderService.addItem(this.itemDto).subscribe(data => {
      this.getCart();
    })
  }

  plusItem(cartId: number) {
    this.itemDto.quantity = 1;
    this.itemDto.itemId = cartId;
    this.orderService.addItem(this.itemDto).subscribe(data => {
      this.getCart();
    });
  }

  minusItem(cartId: number) {
    this.itemDto.quantity = -1;
    this.itemDto.itemId = cartId;
    this.orderService.addItem(this.itemDto).subscribe(data => {
      this.getCart();
    });
  }


  ngOnInit(): void {
    this.getCart();
  }

}
