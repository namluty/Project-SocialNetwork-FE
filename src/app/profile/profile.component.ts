import { Component, OnInit } from '@angular/core';
import {PostForm} from '../model/PostForm';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  listPost: PostForm[] = [];

  constructor(private postService: AuthService) { }

  ngOnInit(): void {
    this.showPostProfile();
  }

  showPostProfile(){
    this.postService.showPostProfile().subscribe(data =>{
      this.listPost = data;
    })
  }

}
