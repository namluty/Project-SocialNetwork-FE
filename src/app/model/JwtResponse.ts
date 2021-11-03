export class JwtResponse{
  public token: string;
  public avatar: string;
  public roles: any;
  public fullName: string;
  public phone: string;
  public email: string;


  constructor(token: string, name: string, avatar: string, roles: any, fullName: string, phone: string, email: string) {
    this.token = token;
    this.avatar = avatar;
    this.roles = roles;
    this.fullName = fullName;
    this.phone = phone;
    this.email = email;
  }
}
