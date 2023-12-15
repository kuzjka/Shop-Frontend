import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "./register/register.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "./userService";
import {UserDto} from "./dto/userDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';
  isLoggedIn = false;
  dto: UserDto;
  username!: string;

  constructor(private service: UserService,
              private cookies: CookieService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
    this.dto = new UserDto('', '', '', '', '');

  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorize?response_type=code' +
      '&scope=write&client_id=app-client&redirect_uri=http://localhost:4200';
  }

  logout() {
    this.cookies.delete('access_token');
    window.location.href = 'http://localhost:8080/logout';
    window.location.reload();
  }

  getUser() {
    this.service.getUser().subscribe(data => {
      this.username = data.username;
    })
  }


  addUser() {

    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '500px',
      width: '500px',
      data: {user: this.dto, new: true}
    }).afterClosed().subscribe(data => {
      this.service.addUser(data).subscribe(data2 => {
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
      this.service.editUser(data).subscribe(data2 => {
          this.snackBar.open(data2.message, 'undo', {duration: 3000})
        },
        err => {
          this.snackBar.open(err.error.message, 'undo', {duration: 3000})
        })
    })
  }

  resendToken(token: string) {
    this.service.resendRegistrationToken(token).subscribe(data => {
      this.snackBar.open(data.message, 'undo', {duration: 3000});
    })
  }

  ngOnInit(): void {
    this.getUser();
    let e = window.location.href.indexOf('token');
    if (e != -1) {
      this.resendToken(window.location.href.substring(e + 6));
    }
    this.isLoggedIn = this.service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if (!this.isLoggedIn && i != -1) {
      this.service.retrieveToken(window.location.href.substring(i + 5));

    }
  }
}
