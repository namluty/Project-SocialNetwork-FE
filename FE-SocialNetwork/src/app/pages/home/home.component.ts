import { Component, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SignUpForm} from '../../model/SignUpForm';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {SignInForm} from '../../model/SignInForm';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
      // tslint:disable-next-line:triple-equals
      if (data.token != undefined) {
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setRole(data.roles);
        this.tokenService.setAvatar(data.avatar);
        this.router.navigate(['user-account']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
