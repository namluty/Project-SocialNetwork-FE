import {Component, Input, OnInit} from '@angular/core';
import {PostForm} from '../model/PostForm';
import {LikeService} from '../service/like.service';
import {Like} from '../model/Like';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() post: PostForm;
  likes: Like[] = [];
  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    this.sumLike();
  }



  ngLike(){
    console.log(this.post.id);
    this.likeService.createLike(this.post.id).subscribe(data =>{
      console.log(data, 'like');
      this.sumLike();
    })
  }

  sumLike(){
    this.likeService.sumLike(this.post.id).subscribe(data =>{
      console.log(data, 'sumLike');
      this.likes = data;
    })
  }

}
