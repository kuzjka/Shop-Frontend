import {Component, Inject} from '@angular/core';
import {Photo} from "../../model/photo";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../model/product";

@Component({
    selector: 'app-delete-photo',
    templateUrl: './delete-photo.component.html',
    styleUrls: ['./delete-photo.component.css'],
    standalone: false
})
export class DeletePhotoComponent {
  title = '';
  id = 0;

  constructor(private dialogRef: MatDialogRef<DeletePhotoComponent>,
              @Inject(MAT_DIALOG_DATA) data: DeletePhotoData) {
    this.title = 'delete photos for product: ' + data.product.name + '?';
    this.id = data.product.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DeletePhotoData {
  product: Product;
}
