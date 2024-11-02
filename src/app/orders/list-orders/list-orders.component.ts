import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/orderService";
import {Cart} from "../../model/cart";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit{
orders!: Cart[];
  constructor(private service:OrderService) {
  }
getOrders(){
    this.orders = [];
    this.service.getCart().subscribe(data=>{this.orders = data})
}
  ngOnInit(): void {

    this.getOrders();
  }

}
