import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/orderService";
import {Cart} from "../../model/cart";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit{

  ngOnInit(): void {

  }

}
