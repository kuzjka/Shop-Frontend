import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/orderService";
import {Order} from "../../model/order";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit{
orders!: Order[];
  constructor(private service:OrderService) {
  }
getOrders(){
    this.orders = [];
    this.service.getOrder().subscribe(data=>{this.orders = data})
}
  ngOnInit(): void {

    this.getOrders();
  }


}
