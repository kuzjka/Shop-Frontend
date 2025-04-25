import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {Brand} from "../../model/brand";
import {ProductService} from "../../service/productService";

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css'],
  standalone: false
})
export class AddTypeComponent implements OnInit {
  title: string;
  brands: Brand[] = [];
  hidden: boolean;

  constructor(public productService: ProductService,
              public dialogRef: MatDialogRef<AddTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeDialogData
  ) {
    this.title = data.new ? 'Add type' : 'Edit type';
    this.hidden = !data.new;
  }

  getBrands() {
    this.productService.getAllBrands(undefined, undefined, undefined)
      .subscribe(data => {
        this.brands = data;
      })
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getBrands();
  }
}

export interface TypeDialogData {
  typeForm: FormGroup;
  new: boolean;
}
