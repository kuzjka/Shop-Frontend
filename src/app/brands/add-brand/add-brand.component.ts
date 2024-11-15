import {Component, Inject, OnInit} from '@angular/core';
import {BrandDto} from "../../dto/brandDto";
import {ProductService} from "../../service/productService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Type} from "../../model/type";

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  title: string;
  brandDto: BrandDto;
  types!: Type[];

  constructor(public service: ProductService,
              public dialogRef: MatDialogRef<AddBrandComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BrandDialogData
  ) {
    if (data.new) {
      this.title = "Add brand"
    } else {
      this.title = "Edit brand"
    }
    this.brandDto = data.brandDto;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getTypes() {
    this.service.getAllTypes().subscribe(data => {
      this.types = data;
    })
  }

  ngOnInit(): void {
    this.getTypes();
  }
}

export interface BrandDialogData {
  brandDto: BrandDto;
  new: boolean;
}
