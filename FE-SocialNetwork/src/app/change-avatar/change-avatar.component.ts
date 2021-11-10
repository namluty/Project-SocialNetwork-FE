import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {ChangeAvatar} from '../model/ChangeAvatar';
import {TokenService} from '../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  form: any = {};
  changeAvatar: ChangeAvatar;
  error: any = {
    message: 'no'
  };
  success: any = {
    message: 'yes'
  };
  status = 'Please choose an image and click upload';

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.changeAvatar = new ChangeAvatar(
      this.form.avatarUrl
    );

    this.authService.changeAvatar(this.changeAvatar).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.error)){
        this.status = 'Please upload Avatar!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = "Change Avatar success!";
        this.tokenService.setAvatarUrl(this.form.avatar);
      }
    }, error =>{
      alert('Change avatar Failed!')
    })
  }

  onUploadAvatar($event) {
    this.form.avatarUrl = $event;
  }
}
