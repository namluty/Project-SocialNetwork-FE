import {Injectable} from '@angular/core';
import {Roles} from '../model/Roles';

const TOKEN_KEY = 'Token_Key';
const FULLNAME_KEY = 'FullName_Key';
const ROLE_KEY = 'Role_Key';
const AVATAR_KEY = 'Avatar_Key';
const PHONE_KEY = 'Phone_Key';
const EMAIL_KEY = 'Email_Key';
const ACTIVE_KEY = 'Active_Key';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: Array<string> = [];

  constructor() {
  }


  public setIsActive(isActive: string){
    window.sessionStorage.removeItem(ACTIVE_KEY);
    window.sessionStorage.setItem(ACTIVE_KEY, String(isActive));
  }
  public getIsActive(): string{
    return window.sessionStorage.getItem(ACTIVE_KEY);
  }
  public setPhone(phone: string){
    window.sessionStorage.removeItem(PHONE_KEY);
    window.sessionStorage.setItem(PHONE_KEY, phone);
  }
  public getPhone(): string{
    return window.sessionStorage.getItem(PHONE_KEY);
  }

  public setEmail(email: string){
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }
  public getEmail(): string{
    return window.sessionStorage.getItem(EMAIL_KEY);
  }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setFullName(fullName: string) {
    window.sessionStorage.removeItem(FULLNAME_KEY);
    window.sessionStorage.setItem(FULLNAME_KEY, fullName);
  }

  public getFullName(): string {
    return window.sessionStorage.getItem(FULLNAME_KEY);
  }

  public setAvatarUrl(avatar: string) {
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
  }

  public getAvatarUrl(): string {
    return window.sessionStorage.getItem(AVATAR_KEY);
  }

  public setRole(roles: Roles[]) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }

  public getRole(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role => {
        this.roles.push(role.authority);
      });
    }
    return this.roles;
  }

  public logOut() {
    window.sessionStorage.clear();
    // window.location.reload();
  }
}
