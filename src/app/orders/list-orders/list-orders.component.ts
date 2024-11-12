import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/orderService";
import {Order} from "../../model/order";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  orders!: Order[];

  constructor(private service: OrderService) {
  }
  addOrder(){
    this.service.addOrder().subscribe(data=>{
      this.getOrders();
    })
  }
  getOrders() {
    this.service.getOrder().subscribe(data => {
      this.orders = data;
    })
  }

  ngOnInit(): void {
    this.getOrders();
  }

}
