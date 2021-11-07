import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Comments} from '../model/comment';
import {CommentService} from '../service/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostForm} from '../model/PostForm';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;
  comments: Comments[] = [];
  @Input() post: PostForm;

  constructor(private fb: FormBuilder,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: [null, [Validators.required, Validators.min(3), Validators.max(1000)]]
    });
  }

  ngComment() {
    this.commentService.createComment(this.post.id, this.commentForm.value).subscribe(data => {
      console.log('data', data);
      this.commentForm.reset();
      this.post.commentList.push(data);
    }, error => {
      console.log(error);
    });
  }


  editComment(comments: Comments) {
    comments.check = true;
  }

  submitComment(comments: Comments) {
    this.commentService.editComment(comments.id, comments).subscribe(data => {
      comments.check = false;
    }, error => {
      console.log(error);
    });
  }
}
