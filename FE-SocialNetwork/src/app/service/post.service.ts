import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_DELETE_POST = environment.API_LOCAL + 'deletepost';
  constructor(private http: HttpClient) { }

  deletePost(id: number): Observable<any> {
    return this.http.get<any>(this.API_DELETE_POST + '/' +id);
  }
}
