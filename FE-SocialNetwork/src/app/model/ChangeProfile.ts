export class ChangeProfile{
  fullName: string
  email: string;
  phone?: any;


  constructor(fullName: string, email: string, phone: any) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
  }
}
