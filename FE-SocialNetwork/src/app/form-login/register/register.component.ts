import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SignUpForm} from '../../model/SignUpForm';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  status = 'Please fill in the form to register!';
  form: any = {};
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  check_password = false;
  signUpForm: SignUpForm;
  error1: any = {
    message: "user_existed"
  }
  error2: any = {
    message: "no_email"
  }
  success: any = {
    message: "create_success"
  }
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  register(){
    this.signUpForm = new SignUpForm(
      this.form.fullName,
      this.form.username,
      this.form.password,
      this.form.re_password,
      this.form.email,
      this.form.phone,
      this.form.dateOfBirth,
    )
    this.authService.signup(this.signUpForm).subscribe(data =>{
      console.log('data == ', data);
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'The username is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create account success!'
        this.authService.setData(true);
        this.router.navigate(['login'])
      }
    }, error => {
      alert('No Success')
    })
  }
}
