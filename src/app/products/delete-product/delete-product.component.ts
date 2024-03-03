import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../model/product";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  title = '';
  id = 0;

  constructor(private dialogRef: MatDialogRef<DeleteProductComponent>,
              @Inject(MAT_DIALOG_DATA) data: DeleteProductData) {
    this.title = 'delete product with name: ' + data.product.name + ' ?';
    this.id = data.product.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DeleteProductData {
  product: Product;
}
