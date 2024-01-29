import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {Type} from "../model/type";
import {Brand} from "../model/brand";
import {ProductDto} from "../dto/productDto";
import {BrandDto} from "../dto/brandDto";
import {TypeDto} from "../dto/typeDto";
import {ProductService} from "../service/productService";
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddProductComponent} from "../add-product/add-product.component";
import {PageEvent} from "@angular/material/paginator";
import {DeleteProductComponent} from "../delete-product/delete-product.component";
import {Sort} from "@angular/material/sort";
import {OrderService} from "../service/orderService";
import {CartItemDto} from "../dto/cartItemDto";
import {Cart} from "../model/cart";
import {UserService} from "../service/userService";

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
  productDto: ProductDto;
  brandDto: BrandDto;
  typeDto: TypeDto;
  cartItemDto!: CartItemDto;
  displayedColumns: string[] = ['name', 'price', 'photo', 'type', 'brand', 'actions', 'cart'];
  cart!: Cart;
  role!: string;
  cartProductsIds!: number[];


  constructor(private service: ProductService,
              private orderService: OrderService,
              private userService: UserService,
              private cookies: CookieService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.productDto = new ProductDto(0, 0, 0, '', 0, []);
    this.brandDto = new BrandDto(0, '');
    this.typeDto = new TypeDto(0, '');
    this.cartItemDto = new CartItemDto(0, 0, 0);
  }

  getRole() {
    this.role = this.userService.getRole();
  }

  sortProducts(sortState: Sort) {
    this.service.getProducts(this.currentTypeId, this.currentBrandId, sortState.active,
      sortState.direction, this.currentPage, this.pageSize)
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
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name',
      'ASC', this.currentPage, this.pageSize)
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
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name',
      'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      })
  }

  getProducts() {
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name',
      'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
        this.getRole();
      });
  }

  pageChangeEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.service.getProducts(this.currentTypeId, this.currentBrandId, 'name',
      'ASC', this.currentPage, this.pageSize)
      .subscribe(data => {
        this.products = data.products;
        this.pageSize = data.pageSize;
        this.totalProducts = data.totalProducts;
      })
  }

  addProduct() {
    this.productDto.id = 0;
    this.productDto.typeId = 0;
    this.productDto.brandId = 0;
    this.productDto.name = '';
    this.productDto.price = 0;
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '500px',
      width: '500px',
      data: {
        product: this.productDto, new: true
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
    this.productDto.id = product.id;
    this.productDto.name = product.name;
    this.productDto.price = product.price;
    this.productDto.typeId = product.type.id;
    this.productDto.brandId = product.brand.id;
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '500px',
      width: '500px',
      data: {product: this.productDto, new: false}
    }).afterClosed().subscribe(data => {
      this.service.editProduct(data).subscribe(data => {
        this.getProducts();
        this.currentTypeId = 0;
        this.currentBrandId = 0;
        this.productDto.id = 0;
        this.productDto.photos = [];
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

  removeFromCart(id: number) {
    this.orderService.removeFromCart(id).subscribe(data => {
      this.getCart();
    })
  }

  getCart() {
    this.cartProductsIds = [];
    this.orderService.getCart().subscribe(data => {
      this.cart = data;
      for (let i = 0; i < this.cart.items.length; i++) {
        this.cartProductsIds.push(this.cart.items[i].product.id);
      }
    });
  }

  addToCart(productId: number) {
    this.cartItemDto.productId = productId;
    this.orderService.addCartItem(this.cartItemDto).subscribe(data => {
      this.getCart();
    })
  }

  plusItem(itemId: number) {
    this.cartItemDto.quantity = 1;
    this.cartItemDto.productId = 0;
    this.cartItemDto.itemId = itemId;
    this.orderService.editCartItem(this.cartItemDto).subscribe(data => {
      this.getCart();
    });
  }

  minusItem(itemId: number) {
    this.cartItemDto.quantity = -1;
    this.cartItemDto.productId = 0;
    this.cartItemDto.itemId = itemId;
    this.orderService.editCartItem(this.cartItemDto).subscribe(data => {
      this.getCart();
    });
  }

  ngOnInit(): void {
    this.getRole();
    this.getFilterTypes();
    this.getFilterBrands(this.currentTypeId);
    this.getProducts();
    this.getCart();
  };
}
