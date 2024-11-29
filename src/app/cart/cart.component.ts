import {Component, Inject, OnInit} from '@angular/core';
import {ItemDto} from "../dto/itemDto";
import {OrderService} from "../service/orderService";
import {Item} from "../model/item";
import {OrderDto} from "../dto/orderDto";
import {Cart} from "../model/cart";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../model/user";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  title: string;
  items!: Item[];
  itemDto!: ItemDto;
  totalPrice!: number;
  totalQuantity!: number;
  orderDto: OrderDto;
  user!: User;
  displayedColumns: string[] = ['name', 'photo', 'actions'];

  constructor(private orderService: OrderService,
              private dialogRef: MatDialogRef<CartComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddItemDialog) {
    this.itemDto = new ItemDto(0, 0, 0);
    this.orderDto = data.orderDto;
    this.title = 'cart';
  }

  getCart() {
    this.items = [];
    this.totalPrice = 0;
    this.orderService.getCart().subscribe(data => {
      this.items = data.items;
      this.totalPrice = data.totalPrice;
      this.totalQuantity = data.totalQuantity;
      this.user = data.user;
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

  checkout() {
    this.title = 'checkout';
  }

  onNoClick() {
    this.dialogRef.close();
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

export interface AddItemDialog {
  orderDto: OrderDto;
  cart: Cart;
}
