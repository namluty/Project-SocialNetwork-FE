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


    constructor(private tokenService: TokenService,
                private router: Router,
                private postService: AuthService,
                private friendService: FriendService) {
    }

    formComment: any = {};
    comment: Comments;
    form: any = {status: 'public'};
    post: PostForm;
    fullName: any;
    phone: any;
    email: any;
    avatarUrl: any;
    isCheckAdmin = false;
    admin: any = ['ADMIN'];
    listUser: User[] = [];

    listPost: PostForm[] = [];

    ngOnInit(): void {
        this.getListPost();
        this.fullName = this.tokenService.getFullName();
        this.phone = this.tokenService.getPhone();
        this.email = this.tokenService.getEmail();
        this.avatarUrl = this.tokenService.getAvatarUrl();
        // tslint:disable-next-line:triple-equals
        if (JSON.stringify(this.tokenService.getRole()) == JSON.stringify(this.admin)) {
            this.isCheckAdmin = true;
        }
    }

    logOut() {
        window.sessionStorage.clear();
        this.router.navigate(['login']).then(() => {
        });
    }

    getListPost() {
        this.postService.showListPost().subscribe(data => {
            this.listPost = data;
        });
    }


    // addPost() {
    //   this.getListPost();
    // }

    ngPost() {
        console.log('ko vao day')
        this.post = new PostForm(
            this.form.content,
            this.form.status,
            this.form.imageUrl
        );
        this.postService.createPost(this.post).subscribe(data => {
            this.form.content = '';
            this.getListPost();
        });
    }

    uploadAvatar($event: string) {
        this.form.imageUrl = $event;
    }

    onChangeAvatar1($event: string) {
        this.avatarUrl = $event;
    }

    searchName(name: string) {
        this.friendService.searchByFullName(name).subscribe(data => {
            this.listUser = data;
        });
    }
}
