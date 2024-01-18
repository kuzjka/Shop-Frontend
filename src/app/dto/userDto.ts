export class UserDto {
  role: string;
  username: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmed: string;


  constructor(role: string, username: string, email: string, oldPassword: string, password: string, passwordConfirmed: string) {
    this.role = role;
    this.username = username;
    this.email = email;
    this.oldPassword = oldPassword;
    this.password = password;
    this.passwordConfirmed = passwordConfirmed;
  }
}
