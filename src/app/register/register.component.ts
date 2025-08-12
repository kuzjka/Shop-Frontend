import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from "../dto/user-dto";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent {
  newUser: UserDto;
  title: string;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              @Inject(MAT_DIALOG_DATA) data: UserDialogData) {
    this.newUser = data.user;
    if (data.new) {
      this.title = 'register'
    } else {
      this.title = 'change password';
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

export interface UserDialogData {
  user: UserDto;
  new: boolean;
}

