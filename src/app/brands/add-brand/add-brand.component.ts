import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../service/productService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-add-brand',
    templateUrl: './add-brand.component.html',
    styleUrls: ['./add-brand.component.css'],
    standalone: false
})
export class AddBrandComponent implements OnInit {
  title: string;

  constructor(public service: ProductService,
              public dialogRef: MatDialogRef<AddBrandComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BrandDialogData
  ) {
    if (data.new) {
      this.title = "Add brand"
    } else {
      this.title = "Edit brand"
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}

export interface BrandDialogData {
  brandForm: FormGroup;
  new: boolean;
}
