import {Component, Inject} from '@angular/core';
import {BrandDto} from "../../dto/brandDto";
import {ProductService} from "../../service/productService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent {
  title: string;
  brand: BrandDto;

  constructor(public service: ProductService,
              public dialogRef: MatDialogRef<AddBrandComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BrandDialogData
  ) {
    if (data.new == true) {
      this.title = "Add brand"
    } else {
      this.title = "Edit brand"
    }

    this.brand = data.brand;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

export interface BrandDialogData {
  brand: BrandDto;
  new: boolean;
}
