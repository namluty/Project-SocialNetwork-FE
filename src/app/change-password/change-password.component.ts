import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ChangePassword} from '../model/ChangePassword';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import { TokenService } from '../service/token.service';

class MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  status = 'Please fill in the form to change your password'
  form: any = {};
  myForm: FormGroup;
  changePassWord: ChangePassword;
  matcher = new MyErrorStateMatcher();
  isChangePassed = false;
  errorMessage = '';
  hide = true;
  data: any = {
    message: "yes"
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private tokenService: TokenService) {
    this.myForm = this.formBuilder.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['']
      }, {validator: this.checkPasswords},
    );
  }

  ngOnInit() {
    this.changePassWord = new ChangePassword(
      this.form.currentPassword,
      this.form.newPassword,
      this.form.confirmPassword
    )
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let newpass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmPassword.value;

    return newpass === confirmPass ? null : {notSame: true}
  }

  ngSubmit() {
    this.authService
      .changePassword(this.changePassWord)
      .subscribe(
        data => {
          console.log('data', data)

          if (JSON.stringify(data) == JSON.stringify(this.data)) {
            this.isChangePassed = false;
            console.log('data trong if', data)
            console.log('ischangePass', this.isChangePassed)
            // alert('Bạn đã thay đổi Mật Khẩu thành công');
            this.status = 'Change Password success!'
          } else {
            this.isChangePassed = true;
            // alert('Mật khẩu không khớp')
          }

          // this.router.navigate(['/home']);
        }, error => {
          alert('khong duoc')
        }
      );
  }
}
