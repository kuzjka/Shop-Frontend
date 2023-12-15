import {Component, Inject, OnInit} from '@angular/core';
import {ProductDto} from "../dto/productDto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../productService";
import {Brand} from "../model/brand";
import {Type} from "../model/type";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: ProductDto;
  title: string;
  types: Type[] = [];
  brands: Brand[] = [];
  selectedFiles?: FileList;
  constructor(public service: ProductService, public dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: productDialogData) {
    if (data.new == true) {
      this.title = 'Add product'
    } else {
      this.title = 'Edit product'
    }
    this.product = data.product;
  }
  getTypes() {
    this.service.getAllTypes().subscribe(data => {
      this.types = data;
    })
  }
  getBrands() {
    this.service.getAllBrands().subscribe(data => {
      this.brands = data;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  handleUpload(event: any) {
    this.product.photos = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {

      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsBinaryString(this.selectedFiles[i]);
        reader.onload = () => {
          if (!reader.result) return;
          this.product.photos.push(btoa(reader.result.toString()));
        }
      }
    }
  }
  ngOnInit(): void {
    this.getTypes();
    this.getBrands();
  }
}
export interface productDialogData {
  product: ProductDto;
  new: boolean;
}
