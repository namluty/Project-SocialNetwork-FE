import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Comments } from '../model/comment';
import { CommentService } from '../service/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostForm} from '../model/PostForm';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;
  comments : Comments[] =[];
  @Input() post: PostForm;
  constructor(private fb: FormBuilder,
              private commentService : CommentService) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content:[null, [Validators.required, Validators.min(3), Validators.max(1000)]]
    })
  }

  ngComment() {
    this.commentService.createComment(this.post.id, this.commentForm.value).subscribe(data => {
      this.commentForm.reset();
      this.post.commentList.unshift(data);
    },error => {console.log(error)});
  }


  editComment(comments: Comments) {
    comments.check =true;
  }

  deleteComment(comments: Comments, index: number){
    this.commentService.deleteComment(comments.id).subscribe(data =>{
      if(data.code === '200'){
        const i = index;
        const a1 = this.post.commentList.slice(0, i);
        const a2 = this.post.commentList.slice(i + 1, this.post.commentList.length);
        [...this.post.commentList] = a1.concat(a2);
      }else {
        console.log('Error');
      }
    },error => {console.log(error)});
  }

  submitComment(comments: Comments) {
    this.commentService.editComment(comments.id, comments).subscribe(data => {
      comments.check = false;
    },error => {console.log(error)});
  }

}
