import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../model/SignInForm';
import {Router} from '@angular/router';
import {TokenService} from '../service/token.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hide = true;
  form: any = {};
  signInForm: SignInForm;
  checkRegister = false;
  checkLoginFailed = false;
  constructor(  private authService: AuthService,
                private tokenService: TokenService,
                private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getData()){
      this.checkRegister = true;
    }
  }
  ngSubmit(){
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    )
    this.authService.signin(this.signInForm).subscribe(data => {
      if (data.token != undefined) {
        this.tokenService.setToken(data.token);
        this.tokenService.setFullName(data.fullName);
        this.tokenService.setRole(data.roles);
        this.tokenService.setAvatarUrl(data.avatarUrl);
        this.router.navigate(['user-account']).then(() => {
        });
      }
    });
  }
}
