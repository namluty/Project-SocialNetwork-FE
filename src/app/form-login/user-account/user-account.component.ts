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
  form: any = {status: 'public'};
  post: PostForm;
  fullName: any;
  phone: any;
  email: any;

  constructor(private tokenService: TokenService,
              private router: Router,
              private postService: AuthService) {
  }

  ngOnInit(): void {
    this.getListPost();
   this.fullName = this.tokenService.getFullName();
    console.log(this.fullName, 'sdugsdasdhsaukdgask');
    this.phone = this.tokenService.getPhone();
   this.email = this.tokenService.getEmail();
  }

  logOut() {
    console.log('goi log out');
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
      // window.location.reload();
    });
  };

  listPost: PostForm[] = [];

  getListPost() {
    this.postService.showListPost().subscribe(data => {
      this.listPost = data;
    });
  }

  addPost() {
    this.getListPost();
  }

  ngPost() {
    this.post = new PostForm(
      this.form.content,
      this.form.status,
      this.form.imageUrl
    );
    this.postService.createPost(this.post).subscribe(data => {
      console.log('data', data);
    });
    // onUploadAvatar($event: string){
    //   this.form.avatarUrl = $event;
    // }
  }

  uploadAvatar($event: string) {
    this.form.imageUrl = $event;
  }
}
