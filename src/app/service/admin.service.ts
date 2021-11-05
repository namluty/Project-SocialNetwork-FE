import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_PAGE_USER = environment.API_LOCAL+'page-user';
  private API_CHANGE_ROLE = environment.API_LOCAL+'block';
  constructor(private http : HttpClient) { }
  pageUser(request){
    const params = request;
    return this.http.get(this.API_PAGE_USER, {params})
  }
  changeRoleUser(id: number): Observable<any>{

    // @ts-ignore
    return this.http.put<any>(`${this.API_CHANGE_ROLE}/${id}`);
  }

}
