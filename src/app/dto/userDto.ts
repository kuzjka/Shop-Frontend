export class UserDto {
  username: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmed: string;


  constructor(username: string, email: string, oldPassword: string, password: string, passwordConfirmed: string) {
    this.username = username;
    this.email = email;
    this.oldPassword = oldPassword;
    this.password = password;
    this.passwordConfirmed = passwordConfirmed;
  }
}
