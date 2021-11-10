import {Component, Input, OnInit} from '@angular/core';
import {PostForm} from '../model/PostForm';
import {LikeService} from '../service/like.service';
import {Like} from '../model/Like';
import {Comments} from '../model/comment';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() post: PostForm;
  likes: Like[]=[];
  comments : Comments[] =[];
  isLiked = false;
  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    this.sumLike();
  }

  ngLike(){
    console.log(this.post.id);
    this.likeService.createLike(this.post.id).subscribe(data =>{
      this.isLiked = !this.isLiked;
      this.sumLike();
    })
  }

  sumLike(){
    this.likeService.sumLike(this.post.id).subscribe(data =>{
      this.likes = data;
    })
  }
}
