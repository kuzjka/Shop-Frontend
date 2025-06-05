import {Component, OnInit} from '@angular/core';
import {UserDto} from "../dto/userDto";
import {UserService} from "../service/userService";
import {AuthService} from "../service/auth-service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isOidc = false;
  dto: UserDto;
  username!: string;
  role!: string;

  constructor(private userService: UserService,
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.dto = new UserDto('', '', '', '', '', '');
  }

  login() {

    window.location.href = 'http://localhost:8080/oauth2/authorize?client_id=app-client&response_type=code';
  }

  login2() {
    this.authService.login();
  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      this.username = data.username;
      this.role = data.role;
      if (this.role != 'none') {
        this.userService.setRole(this.role);
      }
    })
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
    this.dto.username = this.username;
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
    window.location.href = 'http://localhost:8080/logout';
    this.userService.clearData();
    this.getUser();
    window.location.href = '/';
  }

  ngOnInit(): void {
    this.getUser();
    this.isLoggedIn = this.userService.checkCredentials();
    let i = window.location.href.indexOf('code');
    if (!this.isLoggedIn && i != -1 && !this.isOidc) {
      this.userService.retrieveToken(window.location.href.substring(i + 5));
    }
  }
}
