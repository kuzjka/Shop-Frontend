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
  currentTypeIds: number[] = [];
  currentBrandIds: number[] = [];
  pageSize = 5;
  totalProducts = 0;
  pageSizeOptions = [2, 5, 10]
  currentPage = 0;
  dto: ProductDto;
  isLoggedIn = false;
  displayedColumns: string[] = ['name', 'price', 'type', 'brand', 'actions'];

  constructor(private service: Service,
              private cookies: CookieService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.dto = new ProductDto(0, 0, 0, '', 0);
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorize?response_type=code' +
      '&scope=write&client_id=app-client';
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
    this.dto.price = 0;
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '500px',
      width: '500px',
      data: {
        product: this.dto, new: true
      }
    }).afterClosed().subscribe(data => {
      this.service.addProduct(data).subscribe(data => {
        this.getProducts(0, 0);
        this.currentTypeIds = [];
        this.currentBrandIds = [];
      })
    })
  }

  getFilterTypes() {
    this.service.getProductTypes().subscribe(data => {
      this.filterTypes = data;
    })
  }

  getFilterBrands(typeIds: number[]) {
    this.service.getProductBrands(typeIds).subscribe(data => {
      this.filterBrands = data;
    })
  }

  typeFilter(typeId: number) {
    if (this.currentTypeIds.includes(typeId)) {
      let index = this.currentTypeIds.indexOf(typeId);
      this.currentTypeIds.splice(index, 1);
    } else {
      this.currentTypeIds.push(typeId);
    }
    this.getFilterBrands(this.currentTypeIds);
    this.service.getProducts(this.currentTypeIds, this.currentBrandIds, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
      })
  }

  brandFilter(brandId: number) {
    if (this.currentBrandIds.includes(brandId)) {
      let index = this.currentBrandIds.indexOf(brandId);
      this.currentBrandIds.splice(index, 1);
    } else {
      this.currentBrandIds.push(brandId);
    }
    this.service.getProducts(this.currentTypeIds, this.currentBrandIds, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      })
  }

  getProducts(typeId: number, brandId: number) {
    this.service.getProducts(this.currentTypeIds, this.currentBrandIds, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      });
  }

  pageChangeEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.service.getProducts(this.currentTypeIds, this.currentBrandIds, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      })
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '500px',
      width: '500px',
      data: {username: '', password: ''}
    }).afterClosed().subscribe(data => {
      this.service.register(data).subscribe(data2 => {
          this.snackBar.open(data2.message, 'Undo', {duration: 3000})
        },
        error => {

          this.snackBar.open(error.message, 'Undo', {duration: 3000})
        })

    })
  }

  editProduct(product: Product) {
    this.dto.id = product.id;
    this.dto.name = product.name;
    this.dto.price = product.price;
    this.dto.typeId = product.type.id;
    this.dto.brandId = product.brand.id;
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '500px',
      width: '500px',
      data: {product: this.dto, new: false}
    }).afterClosed().subscribe(data => {
      this.service.editProduct(data).subscribe(data => {
        this.getProducts(0, 0);
        this.currentTypeIds = [];
        this.currentBrandIds = [];
        this.dto.id = 0;
      })
    })
  }

  deleteProduct(product: Product) {
    this.dialog.open(DeleteProductComponent, {
      height: '500px',
      width: '500px',
      data: {
        product: product
      }
    }).afterClosed().subscribe(data => {
      this.service.deleteProduct(data).subscribe(data => {
        this.getProducts(0, 0);
      })
    })
  }

  sortProducts(sortState: Sort) {
    this.service.getProducts(this.currentTypeIds, this.currentBrandIds, sortState.active, sortState.direction, this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
      })
  }

  ngOnInit(): void {
    let i = window.location.href.indexOf('code');
    this.isLoggedIn = this.service.checkCredentials();
    this.service.retrieveToken(window.location.href.substring(i + 5))
    this.getFilterTypes();
    this.getFilterBrands(this.currentTypeIds)
    this.getProducts(0, 0);
  };
}
