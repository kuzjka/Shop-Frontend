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
import {Token} from "./token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';
  products: Product[] = [];
  filterTypes: Type[] = [];
  filterBrands: Brand[] = [];
  currentTypeId = 0;
  currentBrandId = 0;
  dto: ProductDto;
  isLoggedIn = false;

  constructor(private service: Service,
              private cookies: CookieService,
              private dialog: MatDialog) {

    this.dto = new ProductDto(0, 0, 0, '');
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorize?response_type=code' +
      '&scope=read-write&client_id=app-client';
  }

  logout() {
    this.cookies.delete('access_token');
    window.location.reload();
  }
  addProduct() {
    this.dto.id = 0;
    this.dto.typeId = 0;
    this.dto.brandId = 0;
    this.dto.name = '';
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '400px',
      width: '600px',
      data: {
        product: this.dto, new: true
      }
    }).afterClosed().subscribe(data => {
      this.service.addProduct(data).subscribe(data => {
        this.getProducts(0, 0);
        this.currentTypeId = 0;
        this.currentBrandId = 0;
      })
    })
  }

  getFilterTypes() {
    this.service.getProductTypes().subscribe(data => {
      this.filterTypes = data;
    })
  }

  getFilterBrands(typeId: number) {
    this.service.getProductBrands(typeId).subscribe(data => {
      this.filterBrands = data;
    })
  }

  getProducts(typeId: number, brandId: number) {
    this.service.getProducts(typeId, brandId).subscribe(data => {
      this.products = data;
    });
    this.currentTypeId = typeId;
    this.currentBrandId = brandId;
    this.getFilterBrands(this.currentTypeId);
    this.getFilterTypes();

  }

  editProduct(product: Product) {
    this.dto.id = product.id;
    this.dto.name = product.name;
    this.dto.typeId = product.type.id;
    this.dto.brandId = product.brand.id;

    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '400px',
      width: '600px',
      data: {product: this.dto, new: false}
    }).afterClosed().subscribe(data => {
      this.service.editProduct(data).subscribe(data => {
        this.getProducts(0, 0);
        this.currentTypeId = 0;
        this.currentBrandId = 0;
        this.dto.id = 0;
      })
    })
  }

  deleteProduct(product: Product) {

    this.dialog.open(DeleteProductComponent, {
      height: '400px',
      width: '600px',
      data: {
        product: product
      }
    }).afterClosed().subscribe(data => {
      this.service.deleteProduct(data).subscribe(data => {
        this.getProducts(0, 0);
      })
    })

  }


  ngOnInit(): void {
    let i = window.location.href.indexOf('code');
    this.isLoggedIn = this.service.checkCredentials();

      this.service.retrieveToken(window.location.href.substring(i + 5))

        this.getProducts(0, 0);
      };


}
