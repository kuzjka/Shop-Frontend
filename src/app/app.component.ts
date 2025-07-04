import {Component, OnInit} from "@angular/core";
import {UserDto} from "./dto/userDto";
import {UserService} from "./service/userService";
import {AuthService} from "./service/auth-service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterComponent} from "./register/register.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
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
    this.userService.setLoginVariant('manual');
    window.location.href = 'http://localhost:8080/oauth2/authorize?client_id=app-client&response_type=code' +
      '&scope=openid&redirect_uri=http://localhost:4200';
  }

  login2() {
    this.userService.setLoginVariant('library');
    this.authService.login();

  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      this.username = data.username;
      this.role = data.role;
      if (this.role != 'none') {
        this.userService.setRole(this.role);
      }
    });
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
    this.userService.clearData();
    this.authService.logout();
    window.location.href = 'http://localhost:8080/logout';
    window.location.reload();
  }

  ngOnInit(): void {
    this.getUser();
    this.isLoggedIn = this.userService.checkCredentials();
    let url = new URLSearchParams(window.location.search);
    let code = url.get('code');
    if (!this.isLoggedIn && code != null && this.userService.getLoginVariant() === 'manual') {
      this.userService.retrieveToken(code);
    }
  }
}
