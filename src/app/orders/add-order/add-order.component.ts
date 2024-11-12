import {Component, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {OrderService} from "../../service/orderService";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit{

  constructor(private service: OrderService) {

  }


  ngOnInit(): void {
  }
}
