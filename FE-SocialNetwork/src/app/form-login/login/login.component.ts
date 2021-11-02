import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../model/SignInForm';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
