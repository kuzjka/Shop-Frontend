import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../service/productService";
import {Brand} from "../../model/brand";
import {Type} from "../../model/type";
import {ProductDto} from "../../dto/productDto";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  title: string;
  types!: Type[];
  brands!: Brand[];
  productDto: ProductDto;
  selectedType: number = 1;

  constructor(public service: ProductService,
              public dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductDialogData) {
    if (data.new) {
      this.title = 'Add product'
    } else {
      this.title = 'Edit product'
    }
    this.productDto = data.product;
  }

  getTypes() {
    this.service.getAllTypes().subscribe(data => {
      this.types = data;
    })
  }

  getBrands() {
    this.service.getAllBrands(this.selectedType).subscribe(data => {
      this.brands = data;
    })
  }

  selectType(event: any) {
    this.selectedType = event.value;
    this.service.getAllBrands(this.selectedType).subscribe(data => {
      this.brands = data;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getTypes();
    this.getBrands();
  }
}

export interface ProductDialogData {
  product: ProductDto;
  new: boolean;
}
