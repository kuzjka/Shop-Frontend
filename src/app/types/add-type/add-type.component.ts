import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../service/productService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TypeDto} from "../../dto/typeDto";
import {Brand} from "../../model/brand";

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  title: string;
  typeDto: TypeDto;
  brands!: Brand[];

  constructor(public service: ProductService,
              public dialogRef: MatDialogRef<AddTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeDialogData
  ) {
    if (data.new) {
      this.title = "Add type"
    } else {
      this.title = "Edit type"
    }
    this.typeDto = data.typeDto;
  }

  getBrands() {
    this.service.getAllBrands(0, 'ASC').subscribe(data => {
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
  typeDto: TypeDto;
  new: boolean;
}
