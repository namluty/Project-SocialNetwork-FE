import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private API_FRIEND_SEARCH = environment.API_LOCAL + 'findFriend';
  private API_ADD_FRIEND = environment.API_LOCAL + 'sendaddfriend';
  private API_SET_FRIEND = environment.API_LOCAL + 'setFriend';

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
  //
  // pageFriend(request) {
  //   const params = request;
  //   return this.http.get(this.API_FRIEND_SEARCH);
  // }
  //
  // searchByNameFriend(request, search) {
  //   const params = request;
  //   const nameFriend = search;
  //
  //   return this.http.get(this.API_FRIEND_SEARCH + nameFriend);

  // }
}
