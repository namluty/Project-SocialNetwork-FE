import { Component, OnInit } from '@angular/core';
import {TokenService} from '../service/token.service';
import {AuthService} from '../service/auth.service';
import {ChangeProfile} from '../model/ChangeProfile';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit {
  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ])
  form: any = {};
  changeProfile: ChangeProfile;
  status = 'Please fill in the form to change your Profile!';
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "yes"
  }
  constructor(private authService: AuthService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
  }
  ngSubmit(){
    this.changeProfile = new ChangeProfile(
      this.form.fullName,
      this.form.email,
      this.form.phone
    )
    this.authService.changeProfile(this.changeProfile).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Change Profile success!';
        this.tokenService.setFullName(this.form.fullName);
        this.tokenService.setPhone(this.form.phone)
        alert('Change profile success! Please login with new username and password')
        this.tokenService.logOut();

      }
    })
  }
}
