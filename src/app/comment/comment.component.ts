import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comments } from '../model/comment';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  // form : any
  // commnet: Comments

  constructor(private commentService : CommentService,
              private router: Router) { }

  ngOnInit(): void {
  }


  // ngComment(id:number) {
  //   // @ts-ignore
  //   this.commnet = new Comments(
  //       this.form.content
  //   );
  //   this.commentService.createComment(id).subscribe(data => {
  //     console.log('data', data);
  //     this.form.content = '';
  //   });
  // }

}
