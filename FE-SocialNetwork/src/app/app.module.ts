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
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
// @ts-ignore
import { ChatComponent } from './chat/chat.component';
import {MatBadgeModule} from '@angular/material/badge';
import {CanActiveGuard} from './security/can-active.guard';
import { DialogComponent } from './adminManage/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

registerLocaleData(en);

export const appRoutes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Home'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'notify', component: NotificationComponent, canActivate: [CanActiveGuard], data: {title: 'Notify'}},
  {path: 'user-account', component: UserAccountComponent, canActivate: [CanActiveGuard]},
  {path: 'upload-avatar', component: UploadFileComponent, canActivate: [CanActiveGuard]},
  {path: "change-role/:id", component: AdminManagerComponent, canActivate: [CanActiveGuard], data: {title: 'Change-Role'}},
  {path: 'change-profile', component: ChangeProfileComponent, canActivate: [CanActiveGuard]},
  {path: 'change-avatar', component: ChangeAvatarComponent, canActivate: [CanActiveGuard]},
  {path: 'change-password', component:ChangePasswordComponent, canActivate: [CanActiveGuard]},
  {path: 'user-profile', component:ProfileComponent, canActivate: [CanActiveGuard]},
  {path: 'chat', component:ChatComponent,
  canActivate: [CanActiveGuard]},

];

@NgModule({
  declarations: [CommentComponent, AppComponent, RegisterComponent, UserAccountComponent, LoginComponent, HomeComponent, ChangeProfileComponent,
    UploadFileComponent, AdminManagerComponent, SearchComponent, LikeComponent, ChangeAvatarComponent, UploadAvatarComponent,
    ChangePasswordComponent, ShowAddFriendComponent, ListFriendComponent, ProfileComponent, FriendRequestComponent, NotificationComponent, ChatComponent, DialogComponent],
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
    _MatMenuDirectivesModule, MatMenuModule, MatProgressSpinnerModule, MatPaginatorModule, MatListModule, NzAvatarModule, NzTypographyModule,
    NzListModule, NzProgressModule, NzSelectModule, NzInputModule, NzButtonModule, NzToolTipModule, NzUploadModule, NzAutocompleteModule,
    NzFormModule, NzGridModule, NzDrawerModule, MatBadgeModule, MatDialogModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
