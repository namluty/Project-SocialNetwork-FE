import {Component, Input, OnInit} from '@angular/core';
import {PostForm} from '../model/PostForm';
import {LikeService} from '../service/like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() post: PostForm;

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    this.ngLike();
  }


  ngLike(){
    console.log(this.post.id);
    this.likeService.createLike(this.post.id).subscribe(data =>{
      console.log(data, 'like');
    })
  }

}
