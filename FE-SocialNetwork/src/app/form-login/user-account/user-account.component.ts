import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';
import {PostForm} from '../../model/PostForm';
import {AuthService} from '../../service/auth.service';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  form: any = {};
  post: PostForm;

  constructor(private tokenService: TokenService,
              private router: Router,
              private postService: AuthService) {
  }

  ngOnInit(): void {
  }

  logOut() {
    console.log('goi log out');
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  };

  ngPost() {
    this.post = new PostForm(
      this.form.content,
      this.form.status,
      this.form.avatarUrl
    );
    this.postService.createPost(this.post).subscribe(data => {

    });
    // onUploadAvatar($event: string){
    //   this.form.avatarUrl = $event;
    // }
  }
}
