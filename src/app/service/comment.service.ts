import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {PostForm} from "../model/PostForm";
import {Observable} from "rxjs";
import {Comments} from '../model/comment';
import {any} from 'codelyzer/util/function';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_CREATE_COMMENT = environment.API_LOCAL + 'comment';
  private API_LIST_COMMENT = environment.API_LOCAL + 'showComment';
  private API_EDIT_COMMENT = environment.API_LOCAL + 'updatecomment';

  constructor(private http :HttpClient) { }

  createComment(id: number,comment: Comments): Observable<Comments> {
    return this.http.post<Comments>(this.API_CREATE_COMMENT +'/' +id, comment);
  }

  editComment(id: number,comment: Comments): Observable<Comments> {
    return this.http.put<Comments>(this.API_EDIT_COMMENT +'/' +id, comment);
  }

  getListComment(id: number) : Observable<any>{
    return  this.http.get<any>(this.API_LIST_COMMENT +'/' + id)
  }


}
