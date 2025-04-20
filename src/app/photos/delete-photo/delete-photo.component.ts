import {Component, Inject} from '@angular/core';
import {Photo} from "../../model/photo";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
    this.title = 'delete photo with name: ' + data.photo.name + ' ?';
    this.id = data.photo.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DeletePhotoData {
  photo: Photo;
}
