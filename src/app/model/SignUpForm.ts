export class SignUpForm {
  public fullName: string;
  public username: string;
  public password: string;
  public re_password: string;
  public email: string;
  public phone: any;
  public dateOfBirth: any;
  public avatarUrl: string;
  public gender: string;
  public is_active: any;
  public created_date: any;
  public modified_date: any;
  public roles: string[];


  constructor(fullName: string, username: string, password: string, re_password: string, email: string, phone: any, dateOfBirth: any) {
    this.fullName = fullName;
    this.username = username;
    this.password = password;
    this.re_password = re_password;
    this.email = email;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.roles = ['user'];
  }
}

