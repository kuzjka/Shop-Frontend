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
  totalPrice!: number;

  constructor(private orderService: OrderService) {
    this.itemDto = new ItemDto(0, 0, 0);
  }

  getCart() {
    this.items = [];
    this.totalPrice = 0;
    this.orderService.getItem().subscribe(data => {
      this.items = data.items;
      this.totalPrice = data.totalPrice;
    })
  }

  plusItem(itemId: number) {
    this.itemDto.quantity = 1;
    this.itemDto.itemId = itemId;
    this.orderService.editItem(this.itemDto).subscribe(data => {
      this.getCart();
    });
  }

  minusItem(itemId: number) {
    this.itemDto.quantity = -1;
    this.itemDto.itemId = itemId;
    this.orderService.editItem(this.itemDto).subscribe(data => {
      this.getCart();
    });
  }

  removeFromCart(id: number) {
    this.orderService.removeItem(id).subscribe(data => {
      this.getCart();
    })
  }

  ngOnInit(): void {
    this.getCart();
  }
}
