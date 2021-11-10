import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';
import {PostForm} from '../../model/PostForm';
import {AuthService} from '../../service/auth.service';
import {FriendService} from '../../service/friend.service';
import {User} from '../../model/User';
import {Comments} from '../../model/comment';
import {CommentService} from '../../service/comment.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Chat} from '../../model/chat';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  check = false;
  hidden = false;
  formComment: any ={}
  comment: Comments;
  form: any = {status: 'public'};
  post: PostForm;
  fullName: any;
  phone: any;
  email: any;
  avatar: any;
  isCheckAdmin = false;
  admin: any = ['ADMIN'];
  listUser: User[] = [];
  listPost: PostForm[] = [];
  chat: Chat;


  constructor(private tokenService: TokenService,
              private router: Router,
              private postService: AuthService,
              private friendService: FriendService) {
  }

  ngOnInit(): void {
    this.getListPost();
    this.fullName = this.tokenService.getFullName();
    this.phone = this.tokenService.getPhone();
    this.email = this.tokenService.getEmail();
    this.avatar = this.tokenService.getAvatarUrl();
    if (JSON.stringify(this.tokenService.getRole()) == JSON.stringify(this.admin)) {
    this.isCheckAdmin = true;
    this.getMess();
    }
  }

  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
    });
  };

  getListPost() {
    this.postService.showListPost().subscribe(data => {
      this.listPost = data;
    });
  }

  ngPost() {
    this.post = new PostForm(
      this.form.content,
      this.form.status,
      this.form.imageUrl
    );
    this.postService.createPost(this.post).subscribe(data => {
      console.log('data', data);
      this.form.content = '';
      this.getListPost();
    });
  }

  uploadAvatar($event: string) {
    this.form.imageUrl = $event;
  }

  onChangeAvatar1($event: string) {
    this.avatar = $event;
  }

  searchName(name: string) {
    this.friendService.searchByFullName(name).subscribe(data => {
      this.listUser = data;
    });
  }

  profile() {
    this.check = true;
  }

  timeLine() {
    this.check = false;
  }
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  getMess(){
    this.postService.getMess().subscribe(data => {
      console.log(data, 'get mess');
      this.chat = data;
    });
  }
}
