import {Component, Inject} from '@angular/core';
import {BrandDto} from "../dto/brandDto";
import {ProductService} from "../service/productService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TypeDto} from "../dto/typeDto";

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent {
  title: string;
  type: TypeDto;

  constructor(public service: ProductService,
              public dialogRef: MatDialogRef<AddTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeDialogData
  ) {
    if (data.new == true) {
      this.title = "Add type"
    } else {
      this.title = "Edit type"
    }

    this.type = data.type;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

export interface TypeDialogData {
  type: TypeDto;
  new: boolean;
}
