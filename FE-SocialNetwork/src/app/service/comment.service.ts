import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {Comments} from '../model/comment';
import {Response} from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_CREATE_COMMENT = environment.API_LOCAL + 'comment';
  // private API_LIST_COMMENT = environment.API_LOCAL + 'showComment';
  private API_EDIT_COMMENT = environment.API_LOCAL + 'updatecomment';
  private API_DELETE_COMMENT = environment.API_LOCAL + 'deletecomment';

  constructor(private http :HttpClient) { }

  createComment(id: number,comment: Comments): Observable<Comments> {
    return this.http.post<Comments>(this.API_CREATE_COMMENT +'/' +id, comment);
  }

  editComment(id: number,comment: Comments): Observable<Comments> {
    return this.http.put<Comments>(this.API_EDIT_COMMENT +'/' +id, comment);
  }

  deleteComment(id:number): Observable<Response> {
    return this.http.delete<Response>(this.API_DELETE_COMMENT +'/' + id);
  }

  // getListComment(id: number) : Observable<any>{
  //   return  this.http.get<any>(this.API_LIST_COMMENT +'/' + id);
  // }

}
