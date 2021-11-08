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


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  check = false;
  formComment: any = {};
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
  arrImage: Array<string> = [];
  arrIConvert: Array<string> = [];
  myMap = new Map();

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
    }
  }

  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
    });
  };

  // changeAvatar() {
  //   window.sessionStorage.clear();
  //   this.router.navigate(['change-avatar']).then(() => {
  //   });
  // };

  getListPost() {
    this.postService.showListPost().subscribe(data => {
      this.listPost = data;
      console.log('data list --> ', data);
      for (let i = 0; i < data.length; i++) {
        console.log('i = ', i);
        console.log('lay anh ->', data[i].imageUrl);
        this.arrIConvert = [];
        this.arrIConvert = data[i].imageUrl.split(',');
        console.log('arrIConvert --> ', this.arrIConvert);
        this.myMap.set(i, this.arrIConvert);
      }


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
      this.form = {
        content: null,
        status: 'public',
        imageUrl: null
      };
      this.arrImage = [];
      this.getListPost();
      // window.location.reload();
    });
  }

  addImage($event: string) {
    // this.form.imageUrl = $event;
    this.arrImage.push($event);
    console.log('arrImage - ', this.arrImage);
    console.log('toString -> ', this.arrImage.toString());
    this.form.imageUrl = this.arrImage.toString();
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
}
