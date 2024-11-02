import { Component } from '@angular/core';
import {Item} from "../../model/item";
import {OrderService} from "../../service/orderService";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  constructor(private service: OrderService) {

  }
  //   addOrder(cart: Item){
  //   this.service.addOrder(cart).subscribe(data=>{
  //     alert(data);
  //   });
  // }
}
