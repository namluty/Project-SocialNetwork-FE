import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {PostForm} from "../model/PostForm";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_CREATECOMMET = environment.API_LOCAL + 'comment';

  constructor(private http :HttpClient) { }

  createComment(id :number): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(this.API_CREATECOMMET + '/' +id);
  }
}
