import {Component, Inject, OnInit} from '@angular/core';
import {ProductDto} from "../productDto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Service} from "../service";
import {Brand} from "../brand";
import {Type} from "../type";

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

  constructor(public service: Service, public dialogRef: MatDialogRef<AddProductComponent>,
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
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      if (!reader.result) return;
      this.product.photo = btoa(reader.result.toString());
    };
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
