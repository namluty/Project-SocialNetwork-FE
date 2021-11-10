import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../model/Notification';
import {PostForm} from '../model/PostForm';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API_SHOW_NOTIFY = environment.API_LOCAL + 'listNotify'
  private API_SHOW_POST_NOTIFICATION = environment.API_LOCAL + 'showPostNotification'
  constructor(private http: HttpClient) { }
  
  getNotify(): Observable<any>{
    return this.http.get<any>(this.API_SHOW_NOTIFY);
  }

  getPostNotification(id: number): Observable<PostForm>{
    return this.http.get<PostForm>(this.API_SHOW_POST_NOTIFICATION +'/'+ id);
  }
}
