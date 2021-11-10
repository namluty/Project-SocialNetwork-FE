import {Component, OnInit} from '@angular/core';
import {PostForm} from '../model/PostForm';
import {AuthService} from '../service/auth.service';
import {PostService} from '../service/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  listPost: PostForm[] = [];
  myMap = new Map();
  arrImage: Array<string> = [];
  arrIConvert: Array<string> = [];

  constructor(private postService: AuthService,
              private deletePostService: PostService) {
  }

  ngOnInit(): void {
    this.showPostProfile();
  }

  showPostProfile() {
    this.postService.showPostProfile().subscribe(data => {
      this.listPost = data;
      for (let i = 0; i < data.length; i++) {
        this.arrIConvert = [];
        this.arrIConvert = data[i].imageUrl.split(',');
        this.myMap.set(i, this.arrIConvert);
      }
    });
  }

  deletePosts(index: number, id: number) {
    this.deletePostService.deletePost(id).subscribe(data => {
      const i = index;
      const a1 = this.listPost.slice(0, i);
      const a2 = this.listPost.slice(i + 1, this.listPost.length);
      [...this.listPost] = a1.concat(a2);
    });
    this.getListPost();
    ;
  }
  getListPost() {
    this.postService.showListPost().subscribe(data => {
      this.listPost = data;
    });
  }
}
