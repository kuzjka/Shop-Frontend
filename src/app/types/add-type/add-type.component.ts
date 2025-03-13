import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  title: string;

  constructor(public dialogRef: MatDialogRef<AddTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeDialogData
  ) {
    if (data.new) {
      this.title = "Add type"
    } else {
      this.title = "Edit type"
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}

export interface TypeDialogData {
  typeForm: FormGroup;
  new: boolean;
}
