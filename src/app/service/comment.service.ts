import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../model/comment";
import {environment} from "../../environments/environment.prod";
import {PostForm} from "../model/PostForm";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_CREATECOMMET = environment.API_LOCAL + 'comment';
  form : any;
  comment : Comment;

  constructor(private http :HttpClient) { }

  createComment(comment: Comment): Observable<any> {
    return this.http.post<any>(this.API_CREATECOMMET, comment);
  }
}
