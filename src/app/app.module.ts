import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {Service} from "./service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AddProductComponent} from './add-product/add-product.component';
import {MatSelectModule} from "@angular/material/select";
import {DeleteProductComponent} from './delete-product/delete-product.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {RegisterComponent} from './register/register.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AddTypeComponent } from './add-type/add-type.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { TypeListComponent } from './type-list/type-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import {RouterModule} from "@angular/router";
import { ProductListComponent } from './product-list/product-list.component';
import { DeleteTypeComponent } from './delete-type/delete-type.component';
import { DeleteBrandComponent } from './delete-brand/delete-brand.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    DeleteProductComponent,
    RegisterComponent,
    AddTypeComponent,
    AddBrandComponent,
    TypeListComponent,
    BrandListComponent,
    ProductListComponent,
    DeleteTypeComponent,
    DeleteBrandComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: ProductListComponent},
      {path: 'types', component: TypeListComponent},
      {path: 'brands', component: BrandListComponent},
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule {
}
