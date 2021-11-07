import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Comments} from '../model/comment';
import {Observable} from 'rxjs';
import {Like} from '../model/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private API_CREATE_LIKE = environment.API_LOCAL + 'likeshow';
  private API_SUM_LIKE = environment.API_LOCAL + 'listlike';
  constructor(private http: HttpClient) { }

  createLike(id: number): Observable<any> {
    return this.http.get<any>(this.API_CREATE_LIKE + '/' +id);
  }

  sumLike(id: number): Observable<any>{
    return this.http.get<any>(this.API_SUM_LIKE + '/' +id);
  }
}
