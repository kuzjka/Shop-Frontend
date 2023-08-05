import {Component, OnInit} from '@angular/core';
import {Service} from "./service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Product} from "./product";
import {Type} from "./type";
import {Brand} from "./brand";
import {ProductDto} from "./productDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';
  loginForm!: FormGroup;
  products: Product[] = [];
  formTypes: Type[] = [];
  formBrands: Brand[] = [];
  filterTypes: Type[] = [];
  filterBrands: Brand[] = [];
  currentTypeId = 0;
  currentBrandId = 0;
  dto: ProductDto;

  constructor(private service: Service, private fb: FormBuilder, private cookies: CookieService) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
    this.dto = new ProductDto(0, 0, 0, '');
  }

  login() {

    // @ts-ignore
    const body = new HttpParams()
      .set('username', this.loginForm.controls['username'].value)
      .set('password', this.loginForm.controls['password'].value)
      .set('grant_type', 'client_credentials');
    this.service.login(body).subscribe(data => {
      this.cookies.set('token', data.access_token);

      this.getProducts(0, 0);
    });
  }

  getFilterTypes() {
    this.service.getTypes().subscribe(data => {
      this.filterTypes = data;
    });

  }

  getFilterBrands(typeId: number) {
    this.service.getBrands(typeId).subscribe(data => {
      this.filterBrands = data;
    })
  }
  getFormTypes() {
    this.service.getTypes().subscribe(data => {
      this.formTypes = data;
    });

  }

  getFormBrands() {
    this.service.getBrands(0).subscribe(data => {
      this.formBrands = data;
    })
  }
  getProducts(typeId: number, brandId: number) {
    this.service.getProducts(typeId, brandId).subscribe(data => {
      this.products = data;
    });

    this.currentTypeId = typeId;
    this.currentBrandId = brandId;
    this.getFilterBrands(this.currentTypeId);
  }

  addProduct(){
    this.service.addProduct(this.dto).subscribe(data=>{
      this.getProducts(0, 0);
    })
  }
  editProduct(product:Product){
    this.dto.id = product.id;
    this.dto.name = product.name;
    this.dto.typeId = product.type.id;
    this.dto.brandId = product.brand.id;
    this.service.editProduct(this.dto).subscribe(data=>{
      this.getProducts(0, 0);
    })
  }
  ngOnInit(): void {
    this.getFilterTypes()
    this.getFilterBrands(0);
    this.getFormBrands();
    this.getFormTypes();
    this.getProducts(0, 0);
  }
}
