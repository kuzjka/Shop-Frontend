import {Component, OnInit} from '@angular/core';
import {Service} from "./service";
import {CookieService} from "ngx-cookie-service";
import {Product} from "./product";
import {Type} from "./type";
import {Brand} from "./brand";
import {ProductDto} from "./productDto";
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "./add-product/add-product.component";
import {DeleteProductComponent} from "./delete-product/delete-product.component";
import {RegisterComponent} from "./register/register.component";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BrandDto} from "./brandDto";
import {AddBrandComponent} from "./add-brand/add-brand.component";
import {TypeDto} from "./typeDto";
import {AddTypeComponent} from "./add-type/add-type.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';

  ngOnInit(): void {
  }

}
