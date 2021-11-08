import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

import {RegisterComponent} from './form-login/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';


import {UserAccountComponent} from './form-login/user-account/user-account.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {httpInterceptorProviders} from './security/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdminManagerComponent } from './adminManage/admin-manager/admin-manager.component';
import { PageUserComponent } from './adminManage/page-user/page-user.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchComponent } from './search/search.component';
import {LoginComponent} from './form-login/login/login.component';
import {CommentComponent} from './comment/comment.component';
import { LikeComponent } from './like/like.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import {UploadAvatarComponent} from './upload-avatar/upload-avatar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ShowAddFriendComponent } from './friend/show-add-friend/show-add-friend.component';
import { ListFriendComponent } from './friend/list-friend/list-friend.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendRequestComponent } from './friend/friend-request/friend-request.component';
import { NotificationComponent } from './notification/notification.component';
import {MatListModule} from '@angular/material/list';

registerLocaleData(en);

export const appRoutes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Home'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'user-account', component: UserAccountComponent},
  {path: 'upload-avatar', component: UploadFileComponent},
  {path: "change-role/:id", component: AdminManagerComponent, data: {title: 'Change-Role'}},
  {path: 'change-profile', component: ChangeProfileComponent},
  {path: 'change-avatar', component: ChangeAvatarComponent},
  {path: 'change-password', component:ChangePasswordComponent}
];

@NgModule({
  declarations: [CommentComponent, AppComponent, RegisterComponent, UserAccountComponent, LoginComponent, HomeComponent, ChangeProfileComponent,
    UploadFileComponent, AdminManagerComponent, PageUserComponent, SearchComponent, LikeComponent, ChangeAvatarComponent, UploadAvatarComponent, ChangePasswordComponent, ShowAddFriendComponent, ListFriendComponent, ProfileComponent, FriendRequestComponent, NotificationComponent],
  imports: [
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {useHash: false}), FormsModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule,
    _MatMenuDirectivesModule, MatMenuModule, MatProgressSpinnerModule, MatPaginatorModule, MatListModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
