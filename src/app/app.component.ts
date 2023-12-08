import {Component, OnInit} from '@angular/core';
import {Service} from "./service";
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "./register/register.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularFrontend';
  isLoggedIn = false;

  constructor(private service: Service,
              private cookies: CookieService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
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

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '500px',
      width: '500px',
      data: {username: '', password: ''}
    }).afterClosed().subscribe(data => {
      this.service.register(data).subscribe(data2 => {
          this.snackBar.open(data2.message, 'undo', {duration: 3000})
        },
        err => {
          this.snackBar.open(err.error.message, 'undo', {duration: 3000})
        })
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if (!this.isLoggedIn && i != -1) {
      this.service.retrieveToken(window.location.href.substring(i + 5));
    }
  }
}
