import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeleteBrandData} from "../../brands/delete-brand/delete-brand.component";
import {Brand} from "../../model/brand";
import {Type} from "../../model/type";

@Component({
  selector: 'app-delete-type',
  templateUrl: './delete-type.component.html',
  styleUrls: ['./delete-type.component.css']
})
export class DeleteTypeComponent {
  title = '';
  id = 0;

  constructor(public dialogRef: MatDialogRef<DeleteTypeComponent>,
              @Inject(MAT_DIALOG_DATA) data: DeleteTypeData) {
    this.title = 'delete ' + data.type.name + '?';
    this.id = data.type.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface DeleteTypeData {
  type: Type;
}
