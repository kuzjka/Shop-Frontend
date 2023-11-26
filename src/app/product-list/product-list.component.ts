import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {Type} from "../type";
import {Brand} from "../brand";
import {ProductDto} from "../productDto";
import {BrandDto} from "../brandDto";
import {TypeDto} from "../typeDto";
import {Service} from "../service";
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddProductComponent} from "../add-product/add-product.component";
import {PageEvent} from "@angular/material/paginator";
import {RegisterComponent} from "../register/register.component";
import {DeleteProductComponent} from "../delete-product/delete-product.component";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = 'angularFrontend';
  products: Product[] = [];
  filterTypes: Type[] = [];
  filterBrands: Brand[] = [];
  currentTypeId = 0;
  currentBrandId = 0;
  pageSize = 10;
  totalProducts = 0;
  pageSizeOptions = [2, 5, 10]
  currentPage = 0;
  dto: ProductDto;
  brandDto: BrandDto;
  typeDto: TypeDto;
  username = 'login';
  isLoggedIn = false;
  displayedColumns: string[] = ['name', 'price', 'photo', 'type', 'brand', 'actions'];

  constructor(private service: Service,
              private cookies: CookieService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.dto = new ProductDto(0, 0, 0, '', 0, []);
    this.brandDto = new BrandDto(0, '');
    this.typeDto = new TypeDto(0, '');
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorize?response_type=code' +
      '&scope=write&client_id=app-client&redirect_uri=http://localhost:4200';


  }

  logout() {
    this.cookies.delete('access_token');
    window.location.href = 'http://localhost:8080/logout';
    window.location.reload();

  }



  getUser() {
    this.service.getUser().subscribe(data => {
      this.username = data.username;

    });
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '500px',
      width: '500px',
      data: {username: '', password: ''}
    }).afterClosed().subscribe(data => {
      this.service.register(data).subscribe(data2 => {
          this.snackBar.open(data2.message, '', {duration: 3000})
        },
        err => {
          this.snackBar.open(err.error.message, 'Undo', {duration: 3000})
        })
    })
  }

  sortProducts(sortState: Sort) {
    this.service.getProducts(this.currentTypeId, this.currentBrandId, sortState.active, sortState.direction, this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
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

  typeFilter(typeId: number) {
    if (typeId == this.currentTypeId) {
      this.currentTypeId = 0;
      this.currentBrandId = 0;
    } else {
      this.currentTypeId = typeId;
      this.currentBrandId = 0;
    }
    this.getFilterBrands(this.currentTypeId);
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
      })
  }

  brandFilter(brandId: number) {
    if (this.currentBrandId == brandId) {
      this.currentBrandId = 0;
    } else {
      this.currentBrandId = brandId;
    }
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      })
  }

  getProducts() {
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      });
  }

  pageChangeEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name', 'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      })
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
          this.getProducts();
          this.getFilterTypes();
          this.getFilterBrands(0);
          this.currentTypeId = 0;
          this.currentBrandId = 0;
        },
        error => {
          this.snackBar.open(error.error.message, '', {duration: 3000})
        }
      )
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
        this.getProducts();
        this.currentTypeId = 0;
        this.currentBrandId = 0;
        this.dto.id = 0;
        this.dto.photos = [];
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
        this.getProducts();
      })
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if (!this.isLoggedIn && i != -1) {
      this.service.retrieveToken(window.location.href.substring(i + 5));
    }
    this.getFilterTypes();
    this.getFilterBrands(this.currentTypeId);
    this.getProducts();
    this.getUser();
  };
}
