import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {Friend} from '../model/Friend';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private API_FRIEND_SEARCH = environment.API_LOCAL + 'findFriend';
  private API_ADD_FRIEND = environment.API_LOCAL + 'sendaddfriend';
  private API_SET_FRIEND = environment.API_LOCAL + 'setFriend';
  private API_SHOW_ADD_FRIEND = environment.API_LOCAL + 'showfriendadd';
  private API_CONFIRM = environment.API_LOCAL + 'confirmfriend';
  private API_REFUSE = environment.API_LOCAL + 'refuse';
  private API_LIST_FRIEND = environment.API_LOCAL + 'showfriend';
  private API_DELETE_FRIEND =environment.API_LOCAL + 'deleteFriend';
  private API_FRIEND_REQUEST =environment.API_LOCAL + 'showFriendRequest';
  private API_DELETE_REQUEST =environment.API_LOCAL + 'deleteRequest';

  constructor(private http: HttpClient) {
  }

  searchByFullName(name: string): Observable<any> {
    return this.http.get<any>(this.API_FRIEND_SEARCH + '/' + name);
  }

  sendAddFriend(id: number): Observable<any> {
    return this.http.get<any>(this.API_ADD_FRIEND + '/' + id);
  }

  setFriend(id: number): Observable<any> {
    return this.http.get<any>(this.API_SET_FRIEND + '/' + id);
  }

  showAddFriend(): Observable<any>{
    return this.http.get<any>(this.API_SHOW_ADD_FRIEND);
  }

  confirm(id: number): Observable<User>{
    return this.http.get<User>(this.API_CONFIRM + '/' + id);
  }

  refuse(id: number): Observable<User>{
    return this.http.delete<User>(this.API_REFUSE + '/' + id);
  }

  showListFriend(): Observable<User[]>{
    return this.http.get<User[]>(this.API_LIST_FRIEND);
  }

  deleteFriend(id: number): Observable<any>{
    return this.http.delete<any>(this.API_DELETE_FRIEND + '/' +id);
  }

  showFriendRequest(): Observable<any>{
    return this.http.get<any>(this.API_FRIEND_REQUEST);
  }

  deleteRequest(id:number): Observable<Friend>{
    return this.http.delete<Friend>(this.API_DELETE_REQUEST +'/' + id);
  }

}
