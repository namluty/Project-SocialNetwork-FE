import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {JwtResponse} from '../model/JwtResponse';
import {PostForm} from '../model/PostForm';
import {Chat} from '../model/Chat';

class SignInForm {
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// Api local
  private API_SIGNUP = environment.API_LOCAL + 'signup';
  private API_SIGNIN = environment.API_LOCAL + 'signin';
  private API_POST = environment.API_LOCAL + 'createPost';
  private API_SHOWPOST = environment.API_LOCAL + 'showPost';
  private API_CHANGE_PROFILE = environment.API_LOCAL + 'change-profile';
  private API_CHANGE_AVATAR = environment.API_LOCAL + 'change-avatar';
  private API_CHANGE_PASSWORD = environment.API_LOCAL + 'change-password';
  private API_SHOW_POST_PROFILE = environment.API_LOCAL + 'showPostProfile';
  private API_MESS = environment.API_LOCAL + 'getMess';
  private API_SHOW_MESSAGE = environment.API_LOCAL + 'showMess';

  data: boolean;

  constructor(private http: HttpClient) {
  }

  createPost( post: PostForm): Observable<any> {
    return this.http.post<any>(this.API_POST, post);
  }

  showListPost(): Observable<any> {
    return this.http.get<any>(this.API_SHOWPOST);
  }

  signup(signUp: SignUpForm): Observable<any> {
    return this.http.post<any>(this.API_SIGNUP, signUp);
  }

  signin(signIn: SignInForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.API_SIGNIN, signIn);
  }

  changeAvatar(info: any): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.API_CHANGE_AVATAR, info);
  }

  changeProfile(info: any):Observable<JwtResponse>{
    return this.http.put<JwtResponse>(this.API_CHANGE_PROFILE, info);
  }

  changePassword(info: any): Observable<JwtResponse>{
    return this.http.put<JwtResponse>(this.API_CHANGE_PASSWORD, info);
  }

  showPostProfile(): Observable<PostForm[]>{
    return this.http.get<PostForm[]>(this.API_SHOW_POST_PROFILE);
  }

  setData(data) {
    this.data = data;
  }

  getData(): boolean {
    return this.data;
  }

  getMess(): Observable<Chat>{
    return this.http.get<Chat>(this.API_MESS);
  }

  showMessage(count: number): Observable<Chat[]>{
    return this.http.get<any>(this.API_SHOW_MESSAGE + '/' + count);
  }
}

