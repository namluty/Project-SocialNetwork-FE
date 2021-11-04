import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private API_FRIEND_SEARCH = environment.API_LOCAL + 'findFriend';

  constructor(private http: HttpClient) {
  }

  searchByFullName(name: string): Observable<any> {
    return this.http.get<any>(this.API_FRIEND_SEARCH + '/' + name);
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
