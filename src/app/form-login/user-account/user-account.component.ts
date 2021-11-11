import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';
import {PostForm} from '../../model/PostForm';
import {AuthService} from '../../service/auth.service';
import {FriendService} from '../../service/friend.service';
import {User} from '../../model/User';
import {Comments} from '../../model/comment';
import {Chat} from '../../model/Chat';


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
  isSearching = false;
  chat: Chat = {name: '', message: '', img: 0};

  constructor(private tokenService: TokenService,
              private router: Router,
              private postService: AuthService,
              private friendService: FriendService,
  ) {
  }

  ngOnInit(): void {
    this.getListPost();
    this.fullName = this.tokenService.getFullName();
    this.phone = this.tokenService.getPhone();
    this.email = this.tokenService.getEmail();
    this.avatar = this.tokenService.getAvatarUrl();
    if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(this.admin)) {
      this.isCheckAdmin = true;
    }
    this.getMess();
  }

  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
    });
  }

  displayNotification() {
    this.router.navigate(['notify']).then(() => {
    });
  }

  getListPost() {
    this.postService.showListPost().subscribe(data => {
      this.listPost = data;
      for (let i = 0; i < data.length; i++) {
        this.arrIConvert = [];
        if (data[i].imageUrl != null) {
          this.arrIConvert = data[i].imageUrl.split(',');
          this.myMap.set(i, this.arrIConvert);
        }
      }
    });
  }

  ngPost() {
    this.post = new PostForm(this.form.content, this.form.status, this.form.imageUrl);
    this.postService.createPost(this.post).subscribe(data => {
      this.form = {
        content: null,
        status: 'public',
        imageUrl: null
      };
      this.arrImage = [];
      this.getListPost();
    });
  }

  addImage($event: string) {
    this.arrImage.push($event);
    this.form.imageUrl = this.arrImage.toString();
  }

  onChangeAvatar1($event: string) {
    this.avatar = $event;
  }

  searchName(name: string) {
    this.friendService.searchByFullName(name).subscribe(data => {
      this.listUser = data;
      this.isSearching = true;
    });
  }

  profile() {
    this.check = true;
  }

  timeLine() {
    this.check = false;
  }

  closeSearch() {
    this.isSearching = false;
  }

  getMess() {
    this.postService.getMess().subscribe(data => {
      console.log(data, 'get mess');
      if (data === null) {
        this.chat.img = 0;
      } else {
        this.chat = data;
      }
    });
  }

  saveImg(data?: any) {
    window.sessionStorage.setItem('Img', data);
    this.router.navigate(['/chat']);
  }
}
