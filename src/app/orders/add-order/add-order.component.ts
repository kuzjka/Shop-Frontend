import { Component } from '@angular/core';
import {Cart} from "../../model/cart";
import {OrderService} from "../../service/orderService";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  constructor(private service: OrderService) {

  }
  //   addOrder(cart: Cart){
  //   this.service.addOrder(cart).subscribe(data=>{
  //     alert(data);
  //   });
  // }
}
