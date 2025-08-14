import {Component, OnInit} from '@angular/core';
import {UserDto} from "../dto/user-dto";
import {UserService} from "../service/user-service";
import {AuthService} from "../service/auth-service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterComponent} from "../register/register.component";
import {Observable} from "rxjs";
import {UserInfo} from "../dto/user-info";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  dto: UserDto;
  user!: Observable<UserInfo>;

  constructor(private userService: UserService,
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.dto = new UserDto('', '', '', '', '');
    this.user = this.userService.userSubject.pipe();
  }

  login() {
    this.userService.login();
  }


  login2() {
    this.userService.setLoginVariant('library');
    this.authService.login();
  }

  addUser() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '500px',
      width: '500px',
      data: {user: this.dto, new: true}
    }).afterClosed().subscribe(data => {
      this.userService.addUser(data).subscribe(data2 => {
          this.snackBar.open(data2.message, 'undo', {duration: 3000})
        },
        err => {
          this.snackBar.open(err.error.message, 'undo', {duration: 3000})
        })
    })
  }

  editUser() {
    this.dto.username = this.userService.fetchUsername();
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '500px',
      width: '500px',
      data: {user: this.dto, new: false}
    }).afterClosed().subscribe(data => {
      this.userService.editUser(data).subscribe(data2 => {
          this.snackBar.open(data2.message, 'undo', {duration: 3000})
        },
        err => {
          this.snackBar.open(err.error.message, 'undo', {duration: 3000})
        })
    })
  }

  logout() {
    if (this.userService.getLoginVariant() === "manual") {
      this.logout1();
    } else {
      this.logout2();
    }
  }

  logout1() {
    this.userService.logout();
  }

  logout2() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.userService.getAuthCode();
  }
}
