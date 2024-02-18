import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../service/productService";
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  title = 'Add photo';

  constructor(public service: ProductService,
              public dialogRef: MatDialogRef<PhotoDialogData>,
              @Inject(MAT_DIALOG_DATA) public data: PhotoDialogData) {
  }

  handleUpload(event: any) {
    const file = event.target.files;
    this.service.setFiles(file);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}

export interface PhotoDialogData {
  photoForm: FormGroup;
}
