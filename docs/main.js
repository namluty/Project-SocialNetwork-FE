(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "++6F":
/*!*****************************************!*\
  !*** ./src/app/service/post.service.ts ***!
  \*****************************************/
/*! exports provided: PostService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostService", function() { return PostService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment.prod */ "cxbk");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.API_DELETE_POST = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'deletepost';
    }
    PostService.prototype.deletePost = function (id) {
        return this.http.get(this.API_DELETE_POST + '/' + id);
    };
    PostService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    PostService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], PostService);
    return PostService;
}());



/***/ }),

/***/ "+XlM":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _raw_loader_chat_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./chat.component.html */ "mTh2");
/* harmony import */ var _chat_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.component.scss */ "DsRI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _stomp_stompjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @stomp/stompjs */ "0Lep");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/auth.service */ "6uu6");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/token.service */ "/QNy");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatComponent = /** @class */ (function () {
    function ChatComponent(tokenService, authService) {
        this.tokenService = tokenService;
        this.authService = authService;
        this.title = 'Meta chat';
        this.description = 'chat serve';
        this.message = '';
        this.img = 1;
        this.greetings = [];
        this.disabled = true;
        this.name = this.tokenService.getFullName();
        this.chats = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.connect();
        this.showMess(this.count = window.sessionStorage.getItem('Img'));
    };
    ChatComponent.prototype.setConnected = function (connected) {
        this.disabled = !connected;
        if (connected) {
            this.greetings = [];
        }
    };
    ChatComponent.prototype.connect = function () {
        // đường dẫn đến server
        var socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
        this.stompClient = _stomp_stompjs__WEBPACK_IMPORTED_MODULE_3__["Stomp"].over(socket);
        var _this = this;
        this.stompClient.connect({}, function (frame) {
            _this.setConnected(true);
            console.log('Connected: ' + frame);
            // là chờ xem server gửi về.
            _this.stompClient.subscribe('/topic/public', function (hello) {
                _this.showGreeting(JSON.parse(hello.body).greeting);
            });
        });
    };
    // disconnect() {
    //   if (this.stompClient != null) {
    //     this.stompClient.disconnect();
    //   }
    //   this.setConnected(false);
    //   console.log('Disconnected!');
    // }
    ChatComponent.prototype.sendName = function () {
        this.stompClient.send('/gkz/hello', {}, 
        // Dữ liệu được gửi đi
        JSON.stringify({ 'name': this.name, 'message': this.message, 'img': this.img++ }));
    };
    ChatComponent.prototype.showGreeting = function (message) {
        this.greetings.unshift(message);
    };
    ChatComponent.prototype.showMess = function (count) {
        var _this_1 = this;
        this.authService.showMessage(count).subscribe(function (data) {
            console.log(data, 'show mess');
            _this_1.chats = data;
        });
    };
    ChatComponent.ctorParameters = function () { return [
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"] },
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }
    ]; };
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-chat',
            template: _raw_loader_chat_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_chat_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"],
            _service_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "+dtN":
/*!****************************************!*\
  !*** ./src/app/model/ChangeProfile.ts ***!
  \****************************************/
/*! exports provided: ChangeProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeProfile", function() { return ChangeProfile; });
var ChangeProfile = /** @class */ (function () {
    function ChangeProfile(fullName, email, phone) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }
    return ChangeProfile;
}());



/***/ }),

/***/ "/QNy":
/*!******************************************!*\
  !*** ./src/app/service/token.service.ts ***!
  \******************************************/
/*! exports provided: TokenService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenService", function() { return TokenService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TOKEN_KEY = 'Token_Key';
var FULLNAME_KEY = 'FullName_Key';
var ROLE_KEY = 'Role_Key';
var AVATAR_KEY = 'Avatar_Key';
var PHONE_KEY = 'Phone_Key';
var EMAIL_KEY = 'Email_Key';
var ACTIVE_KEY = 'Active_Key';
var TokenService = /** @class */ (function () {
    function TokenService() {
        this.roles = [];
    }
    TokenService.prototype.setIsActive = function (isActive) {
        window.sessionStorage.removeItem(ACTIVE_KEY);
        window.sessionStorage.setItem(ACTIVE_KEY, String(isActive));
    };
    TokenService.prototype.getIsActive = function () {
        return window.sessionStorage.getItem(ACTIVE_KEY);
    };
    TokenService.prototype.setPhone = function (phone) {
        window.sessionStorage.removeItem(PHONE_KEY);
        window.sessionStorage.setItem(PHONE_KEY, phone);
    };
    TokenService.prototype.getPhone = function () {
        return window.sessionStorage.getItem(PHONE_KEY);
    };
    TokenService.prototype.setEmail = function (email) {
        window.sessionStorage.removeItem(EMAIL_KEY);
        window.sessionStorage.setItem(EMAIL_KEY, email);
    };
    TokenService.prototype.getEmail = function () {
        return window.sessionStorage.getItem(EMAIL_KEY);
    };
    TokenService.prototype.setToken = function (token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    };
    TokenService.prototype.getToken = function () {
        return window.sessionStorage.getItem(TOKEN_KEY);
    };
    TokenService.prototype.setFullName = function (fullName) {
        window.sessionStorage.removeItem(FULLNAME_KEY);
        window.sessionStorage.setItem(FULLNAME_KEY, fullName);
    };
    TokenService.prototype.getFullName = function () {
        return window.sessionStorage.getItem(FULLNAME_KEY);
    };
    TokenService.prototype.setAvatarUrl = function (avatar) {
        window.sessionStorage.removeItem(AVATAR_KEY);
        window.sessionStorage.setItem(AVATAR_KEY, avatar);
    };
    TokenService.prototype.getAvatarUrl = function () {
        return window.sessionStorage.getItem(AVATAR_KEY);
    };
    TokenService.prototype.setRole = function (roles) {
        window.sessionStorage.removeItem(ROLE_KEY);
        window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
    };
    TokenService.prototype.getRole = function () {
        var _this = this;
        this.roles = [];
        if (sessionStorage.getItem(TOKEN_KEY)) {
            JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(function (role) {
                _this.roles.push(role.authority);
            });
        }
        return this.roles;
    };
    TokenService.prototype.logOut = function () {
        window.sessionStorage.clear();
        // window.location.reload();
    };
    TokenService.ctorParameters = function () { return []; };
    TokenService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TokenService);
    return TokenService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Module06-Project\Project-SocialNetwork-FE\src\main.ts */"zUnb");


/***/ }),

/***/ "0O+I":
/*!*********************************************************************!*\
  !*** ./src/app/friend/friend-request/friend-request.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmcmllbmQtcmVxdWVzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "0k0u":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/upload-file/upload-file.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\r\n    <input type=\"file\" multiple (change)=\"onFileChanged($event)\">\r\n</div>\r\n");

/***/ }),

/***/ "0riC":
/*!**************************************************************!*\
  !*** ./src/app/change-password/change-password.component.ts ***!
  \**************************************************************/
/*! exports provided: ChangePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function() { return ChangePasswordComponent; });
/* harmony import */ var _raw_loader_change_password_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./change-password.component.html */ "He27");
/* harmony import */ var _change_password_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./change-password.component.scss */ "4upH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _model_ChangePassword__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/ChangePassword */ "H3yn");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/auth.service */ "6uu6");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../service/token.service */ "/QNy");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        var invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
        return (invalidCtrl || invalidParent);
    };
    return MyErrorStateMatcher;
}());
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(formBuilder, authService, router, tokenService) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.tokenService = tokenService;
        this.status = 'Please fill in the form to change your password';
        this.form = {};
        this.matcher = new MyErrorStateMatcher();
        this.isChangePassed = false;
        this.errorMessage = '';
        this.hide = true;
        this.data = {
            message: "yes"
        };
        this.myForm = this.formBuilder.group({
            currentPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            newPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            confirmPassword: ['']
        }, { validator: this.checkPasswords });
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.changePassWord = new _model_ChangePassword__WEBPACK_IMPORTED_MODULE_4__["ChangePassword"](this.form.currentPassword, this.form.newPassword, this.form.confirmPassword);
    };
    ChangePasswordComponent.prototype.checkPasswords = function (group) {
        var newpass = group.controls.newPassword.value;
        var confirmPass = group.controls.confirmPassword.value;
        return newpass === confirmPass ? null : { notSame: true };
    };
    ChangePasswordComponent.prototype.ngSubmit = function () {
        var _this = this;
        this.authService
            .changePassword(this.changePassWord)
            .subscribe(function (data) {
            console.log('data', data);
            if (JSON.stringify(data) == JSON.stringify(_this.data)) {
                _this.isChangePassed = false;
                console.log('data trong if', data);
                console.log('ischangePass', _this.isChangePassed);
                // alert('Bạn đã thay đổi Mật Khẩu thành công');
                _this.status = 'Change Password success!';
            }
            else {
                _this.isChangePassed = true;
                // alert('Mật khẩu không khớp')
            }
            // this.router.navigate(['/home']);
        }, function (error) {
            alert('khong duoc');
        });
    };
    ChangePasswordComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_7__["TokenService"] }
    ]; };
    ChangePasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-change-password',
            template: _raw_loader_change_password_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_change_password_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _service_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _service_token_service__WEBPACK_IMPORTED_MODULE_7__["TokenService"]])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());



/***/ }),

/***/ "1/qE":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/form-login/login/login.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 50px 0\">\r\n                <form class=\"form-login\" #f=\"ngForm\" (ngSubmit)=\"ngSubmit()\" novalidate>\r\n                    <mat-error *ngIf=\"checkRegister\" class=\"alert alert-primary\">Create Account Success! Please login\r\n                    </mat-error>\r\n                    <mat-error *ngIf=\"checkLoginFailed\" class=\"alert alert-danger\">Login Failed! Please check your\r\n                        username or password\r\n                    </mat-error>\r\n                    <!-- USERNAME -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Username:</mat-label>\r\n                        <input name=\"username\" [(ngModel)]=\"form.username\" matInput placeholder=\"Placeholder\"\r\n                               #username=\"ngModel\" minlength=\"3\" maxlength=\"100\" required>\r\n                        <mat-icon color=\"accent\" matSuffix>person_outline</mat-icon>\r\n                        <mat-error *ngIf=\"username.hasError('required')\">The username is required!</mat-error>\r\n                        <mat-error *ngIf=\"username.hasError('minlength')\">The name must more than 3 character\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!--PASSWORD -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Enter your password</mat-label>\r\n                        <input name=\"password\" [(ngModel)]=\"form.password\" matInput [type]=\"hide ? 'password' : 'text'\"\r\n                               #password=\"ngModel\" required minlength=\"6\" maxlength=\"20\">\r\n                        <button mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\r\n                                [attr.aria-pressed]=\"hide\">\r\n                            <mat-icon color=\"accent\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\r\n                        </button>\r\n                        <mat-error *ngIf=\"password.hasError('required')\">The password is required!</mat-error>\r\n                        <mat-error *ngIf=\"password.hasError('minlength')\">The password must more than 6 character\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <button type=\"submit\" mat-stroked-button color=\"accent\"\r\n                            class=\"mat-button-toggle-group btn-outline-primary\">Login\r\n                        <mat-icon color=\"accent\" matSuffix>login</mat-icon>\r\n                    </button>\r\n                </form>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "1ZZG":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/friend/friend-request/friend-request.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 0px 0\">\r\n                <div class=\"row\">\r\n                    <div class=\"column\" *ngFor=\"let user of users\">\r\n<!--                            <i style=\"font-size: 1.5vw; color: crimson\">{{user.fullName}}</i>-->\r\n                            <nz-avatar class=\"w3-center w3-circle w3-margin-right\" [nzSize]=\"110\" nzIcon=\"user\"\r\n                                       nzSrc=\"{{user.avatarUrl}}\"></nz-avatar><br><br>\r\n                        <button (click)=\"deleteRequest(user.id)\" nz-button nzType=\"primary\" [nzSize]=\"\" nzShape=\"round\">\r\n                            <i nz-icon nzType=\"download\"></i>\r\n                            Delete Request\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");

/***/ }),

/***/ "1liP":
/*!*************************************************!*\
  !*** ./src/app/service/notification.service.ts ***!
  \*************************************************/
/*! exports provided: NotificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment.prod */ "cxbk");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationService = /** @class */ (function () {
    function NotificationService(http) {
        this.http = http;
        this.API_SHOW_NOTIFY = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'listNotify';
        this.API_SHOW_POST_NOTIFICATION = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'showPostNotification';
    }
    NotificationService.prototype.getNotify = function () {
        return this.http.get(this.API_SHOW_NOTIFY);
    };
    NotificationService.prototype.getPostNotification = function (id) {
        return this.http.get(this.API_SHOW_POST_NOTIFICATION + '/' + id);
    };
    NotificationService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    NotificationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], NotificationService);
    return NotificationService;
}());



/***/ }),

/***/ "3BjR":
/*!**********************************************!*\
  !*** ./src/app/search/search.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".card {\n  text-align: center;\n}\n\n.column {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHNlYXJjaC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtBQUVGIiwiZmlsZSI6InNlYXJjaC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJke1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4uY29sdW1ue1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "48gU":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/form-login/user-account/user-account.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!DOCTYPE html>\r\n<html>\r\n<title>Meta Network</title>\r\n<meta charset=\"UTF-8\">\r\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">\r\n<link rel=\"stylesheet\" href=\"https://www.w3schools.com/lib/w3-theme-blue-grey.css\">\r\n<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'>\r\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\r\n<style>\r\n    html, body, h1, h2, h3, h4, h5 {\r\n        font-family: \"Open Sans\", sans-serif\r\n    }\r\n</style>\r\n<body class=\"w3-theme-l5\">\r\n\r\nNavbar\r\n<div class=\"w3-top\">\r\n    <div class=\"w3-bar w3-theme-d2 w3-left-align w3-large\">\r\n        <a (click)=\"timeLine()\" class=\"w3-bar-item w3-button w3-padding-large w3-theme-d4\"><i\r\n                class=\"fa fa-home w3-margin-right\"></i>Metabook</a>\r\n        <a class=\"w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white\" title=\"News\"><i\r\n                class=\"fa fa-globe\"></i></a>\r\n\r\n\r\n        <a (click)=\"saveImg(chat.img)\" class=\"w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white\">\r\n            <mat-icon nz-icon nzType=\"comment\" nzTheme=\"outline\" matBadge=\"{{chat.img}}\" matBadgeColor=\"warn\">forward_to_inbox</mat-icon>\r\n            <span class=\"cdk-visually-hidden\"></span>\r\n        </a>s\r\n\r\n\r\n        <a [matMenuTriggerFor]=\"menu1\" class=\"w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white\"\r\n           title=\"News\"><i\r\n                class=\"fa fa-globe\"></i></a>\r\n        <mat-menu #menu1=\"matMenu\">\r\n            <button style=\"text-align:center\" (click)=\"displayNotification()\" mat-button></button>\r\n            <app-notification></app-notification>\r\n        </mat-menu>\r\n\r\n        <div class=\"w3-dropdown-hover w3-hide-small\">\r\n            <form class=\"d-flex\">\r\n                <input #element style=\"right: 15%;width: 250px; margin-top: 8px\"\r\n                       class=\"form-control me-2\" type=\"search\"\r\n                       placeholder=\"Search\"\r\n                       aria-label=\"Search\">\r\n                <button (click)=\"searchName(element.value)\" style=\"margin-top: 8px; height: 36px\"\r\n                        class=\"btn btn-outline-success\" type=\"submit\">Search\r\n                </button>\r\n                <a style=\"position: fixed; right: 2%;top:1%\">\r\n                    <img [matMenuTriggerFor]=\"menu\" src=\"{{avatar}}\" class=\"w3-circle\" style=\"height:40px;width:40px\"\r\n                         alt=\"Avatar\">\r\n                    <mat-menu #menu=\"matMenu\">\r\n                        <button style=\"text-align:center\" (click)=\"logOut()\" mat-button>Log Out</button>\r\n                        <br>\r\n                        <button mat-button>...</button>\r\n                    </mat-menu>\r\n                </a>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- Navbar on small screens -->\r\n<div id=\"navDemo\" class=\"w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large\">\r\n    <a href=\"#\" class=\"w3-bar-item w3-button w3-padding-large\">Link 1</a>\r\n    <a href=\"#\" class=\"w3-bar-item w3-button w3-padding-large\">Link 2</a>\r\n    <a href=\"#\" class=\"w3-bar-item w3-button w3-padding-large\">Link 3</a>\r\n    <a href=\"#\" class=\"w3-bar-item w3-button w3-padding-large\">My Profile</a>\r\n</div>\r\n\r\n<!-- Page Container -->\r\n<div class=\"w3-container w3-content\" style=\"max-width:1400px;margin-top:80px\">\r\n    <!-- The Grid -->\r\n    <div class=\"w3-row\">\r\n        <!-- Left Column -->\r\n        <div class=\"w3-col m3\">\r\n            <!-- Profile -->\r\n            <div class=\"w3-card w3-round w3-white\">\r\n                <div class=\"w3-container\">\r\n                    <br>\r\n                    <nz-avatar (click)=\"profile()\" class=\"w3-left w3-circle w3-margin-right\" [nzSize]=\"90\" nzIcon=\"user\"\r\n                               nzSrc=\"{{avatar}}\"></nz-avatar>\r\n                    <br>\r\n                    <span style=\"font-size:large\" nz-typography nzType=\"success\"><B>{{fullName}}</B></span><br>\r\n                    <span nz-typography><code>{{phone}}</code></span><br>\r\n                    <span style=\"color: cadetblue\" nz-typography nzType=\"secondary\">{{email}}</span><br><br>\r\n                    <nz-list>\r\n                        <span style=\"color: sandybrown\" routerLink=\"/change-profile\" nz-typography><I>Change Profile</I></span><br>\r\n                        <span style=\"color: cornflowerblue\" routerLink=\"/change-avatar\"\r\n                              nz-typography><I>Change Avatar</I></span><br>\r\n                        <span nz-typography nzType=\"danger\" routerLink=\"/change-password\"><I>Change Password</I></span>\r\n                    </nz-list>\r\n                </div>\r\n            </div>\r\n            <br>\r\n\r\n            <!-- Accordion -->\r\n            <!--            <div class=\"w3-card w3-round\">-->\r\n            <!--                <div class=\"w3-white\">-->\r\n            <!--                    <button onclick=\"myFunction('Demo1')\" class=\"w3-button w3-block w3-theme-l1 w3-left-align\"><i-->\r\n            <!--                            class=\"fa fa-circle-o-notch fa-fw w3-margin-right\"></i> My Groups-->\r\n            <!--                    </button>-->\r\n            <!--                    <div id=\"Demo1\" class=\"w3-hide w3-container\">-->\r\n            <!--                        <p>Some text..</p>-->\r\n            <!--                    </div>-->\r\n            <!--                    <button onclick=\"myFunction('Demo2')\" class=\"w3-button w3-block w3-theme-l1 w3-left-align\"><i-->\r\n            <!--                            class=\"fa fa-calendar-check-o fa-fw w3-margin-right\"></i> My Events-->\r\n            <!--                    </button>-->\r\n            <!--                    <div id=\"Demo2\" class=\"w3-hide w3-container\">-->\r\n            <!--                        <p>Some other text..</p>-->\r\n            <!--                    </div>-->\r\n            <!--                    <button onclick=\"myFunction('Demo3')\" class=\"w3-button w3-block w3-theme-l1 w3-left-align\"><i-->\r\n            <!--                            class=\"fa fa-users fa-fw w3-margin-right\"></i> My Photos-->\r\n            <!--                    </button>-->\r\n            <!--                    <div id=\"Demo3\" class=\"w3-hide w3-container\">-->\r\n            <!--                        <div class=\"w3-row-padding\">-->\r\n            <!--                            <br>-->\r\n            <!--                            <div class=\"w3-half\">-->\r\n            <!--                                <img src=\"/w3images/lights.jpg\" style=\"width:100%\" class=\"w3-margin-bottom\">-->\r\n            <!--                            </div>-->\r\n            <!--                            <div class=\"w3-half\">-->\r\n            <!--                                <img src=\"/w3images/nature.jpg\" style=\"width:100%\" class=\"w3-margin-bottom\">-->\r\n            <!--                            </div>-->\r\n            <!--                            <div class=\"w3-half\">-->\r\n            <!--                                <img src=\"/w3images/mountains.jpg\" style=\"width:100%\" class=\"w3-margin-bottom\">-->\r\n            <!--                            </div>-->\r\n            <!--                            <div class=\"w3-half\">-->\r\n            <!--                                <img src=\"/w3images/forest.jpg\" style=\"width:100%\" class=\"w3-margin-bottom\">-->\r\n            <!--                            </div>-->\r\n            <!--                            <div class=\"w3-half\">-->\r\n            <!--                                <img src=\"/w3images/nature.jpg\" style=\"width:100%\" class=\"w3-margin-bottom\">-->\r\n            <!--                            </div>-->\r\n            <!--                            <div class=\"w3-half\">-->\r\n            <!--                                <img src=\"/w3images/snow.jpg\" style=\"width:100%\" class=\"w3-margin-bottom\">-->\r\n            <!--                            </div>-->\r\n            <!--                        </div>-->\r\n            <!--                    </div>-->\r\n            <!--                </div>-->\r\n            <!--            </div>-->\r\n\r\n            <!-- Block/ Unblock -->\r\n            <div class=\"w3-card w3-round w3-white w3-hide-small\">\r\n                <div *ngIf=\"isCheckAdmin\" class=\"w3-container\">\r\n                    <app-admin-manager></app-admin-manager>\r\n                </div>\r\n            </div>\r\n            <br>\r\n\r\n            <!-- Alert Box -->\r\n            <div class=\"w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small\">\r\n        <span onclick=\"this.parentElement.style.display='none'\" class=\"w3-button w3-theme-l3 w3-display-topright\">\r\n          <i class=\"fa fa-remove\"></i>\r\n        </span>\r\n                <p><strong>Hey!</strong></p>\r\n                <p>People are looking at your profile. Find out who.</p>\r\n            </div>\r\n\r\n            <!-- End Left Column -->\r\n        </div>\r\n\r\n        <!-- Middle Column -->\r\n        <div class=\"w3-col m7\">\r\n\r\n            <div class=\"w3-row-padding\">\r\n                <div class=\"w3-col m12\">\r\n                    <div class=\"w3-card w3-round w3-white\">\r\n                        <div class=\"w3-container w3-padding\">\r\n                            <form class=\"\" #f=\"ngForm\" (ngSubmit)=\"f.form.valid && ngPost()\" novalidate>\r\n                                <!-- CONTENT -->\r\n                                <div>\r\n                                    <mat-form-field style=\"width: 85%\" appearance=\"outline\">\r\n                                        <input name=\"content\" [(ngModel)]=\"form.content\" matInput\r\n                                               placeholder=\"How are you today?\"><br>\r\n                                        <app-upload-avatar (giveURLtoCreate)=\"addImage($event)\"></app-upload-avatar>\r\n                                    </mat-form-field>\r\n                                    <nz-select name=\"status\" ngModel=\"lucy\" style=\"color: green\"\r\n                                               [(ngModel)]=\"form.status\" nzAllowClear\r\n                                               nzPlaceHolder=\"Choose\">\r\n                                        <nz-option nzValue=\"public\" nzLabel=\"Public\"></nz-option>\r\n                                        <nz-option nzValue=\"friend\" nzLabel=\"Friend\"></nz-option>\r\n                                        <nz-option nzValue=\"onlyme\" nzLabel=\"Onlyme\"></nz-option>\r\n                                    </nz-select>\r\n                                    <button mat-stroked-button color=\"accent\"\r\n                                            class=\"mat-button-toggle-group btn-outline-primary\">POST\r\n                                    </button>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <br>\r\n            <div *ngIf=\"isSearching\" class=\"w3-row-padding\">\r\n                <div class=\"w3-col m12\">\r\n                    <div class=\"w3-card w3-round w3-white\">\r\n                        <div class=\"w3-container w3-padding\">\r\n                            <!-- List search -->\r\n                            <button type=\"button\" class=\"btn btn-primary\" (click)=\"closeSearch()\">Result</button>\r\n                            <div *ngFor=\"let friend of listUser\">\r\n                                <nz-avatar class=\"w3-left w3-circle w3-margin-right\" [nzSize]=\"64\" nzIcon=\"user\"\r\n                                           nzSrc=\"{{friend.avatarUrl}}\"></nz-avatar>\r\n                                <h5 nz-typography>\r\n                                    {{friend.fullName}}\r\n                                </h5>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- show post -->\r\n            <div *ngIf=\"check\">\r\n                <app-profile></app-profile>\r\n            </div>\r\n\r\n            <div *ngIf=\"!check\">\r\n                <div *ngFor=\"let post of listPost; let p = index\"\r\n                     class=\"w3-container w3-card w3-white w3-round w3-margin\"><br>\r\n                    <nz-avatar class=\"w3-left w3-circle w3-margin-right\" [nzSize]=\"64\" nzIcon=\"user\"\r\n                               nzSrc=\"{{post.user.avatarUrl}}\"></nz-avatar>\r\n                    <h5 nz-typography>\r\n                        {{post.user.fullName}}\r\n                        <small nz-typography nzType=\"secondary\"\r\n                               class=\"w3-right w3-opacity\">{{post.created_date}}</small>\r\n                    </h5>\r\n                    <small nz-typography nzType=\"secondary\">{{post.status}}</small>\r\n                    <hr class=\"w3-clear\">\r\n                    <p>{{post.content}}</p>\r\n                    <div class=\"row\">\r\n                        <div class=\"column\" *ngFor=\"let img of myMap.get(p)\">\r\n                            <div class=\"card\">\r\n                                <img class=\"img\" src=\"{{img}}\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <hr class=\"w3-clear\">\r\n                    <div class=\"w3-row-padding\" style=\"margin:0 -16px\">\r\n                    </div>\r\n                    <app-like [post]=\"post\"></app-like>\r\n                </div>\r\n            </div>\r\n            <style>\r\n                .img:hover {\r\n                    -ms-transform: scale(2.0);\r\n                    -webkit-transform: scale(2.0);\r\n                    transform: scale(2.0);\r\n                }\r\n            </style>\r\n            <!-- end show post -->\r\n\r\n            <!-- End Middle Column -->\r\n        </div>\r\n\r\n        <!-- Right Column -->\r\n        <div class=\"w3-col m2\">\r\n            <div class=\"w3-card w3-round w3-white w3-center\">\r\n                <div class=\"w3-container\">\r\n                    <span nz-typography nzType=\"danger\">Friends Request</span>\r\n                    <app-show-add-friend></app-show-add-friend>\r\n                </div>\r\n            </div>\r\n            <br>\r\n\r\n            <div class=\"w3-card w3-round w3-white w3-padding-16 w3-center\">\r\n                <!--                Gỡ lại yêu cầu KB-->\r\n                <span nz-typography nzType=\"success\">Pending Add Friend</span>\r\n                <app-friend-request></app-friend-request>\r\n\r\n            </div>\r\n            <br>\r\n            <div class=\"w3-card w3-round w3-white w3-padding-16 w3-center\">\r\n                <!--                Tìm bạn-->\r\n                <span nz-typography nzType=\"danger\">Friend Suggestion</span>\r\n                <app-search></app-search>\r\n\r\n            </div>\r\n            <br>\r\n            <div class=\"w3-card w3-round w3-white w3-padding-16 w3-center\">\r\n                <!--                List bạn-->\r\n                <span nz-typography nzType=\"danger\"> Your Friends List</span>\r\n                <app-list-friend></app-list-friend>\r\n\r\n            </div>\r\n            <br>\r\n\r\n            <div class=\"w3-card w3-round w3-white w3-padding-32 w3-center\">\r\n                <p><i class=\"fa fa-bug w3-xxlarge\"></i></p>\r\n            </div>\r\n\r\n            <!-- End Right Column -->\r\n        </div>\r\n\r\n        <!-- End Grid -->\r\n    </div>\r\n\r\n    <!-- End Page Container -->\r\n</div>\r\n<br>\r\n\r\n<!-- Footer -->\r\n<footer class=\"w3-container w3-theme-d3 w3-padding-16\">\r\n    <h5>Footer</h5>\r\n</footer>\r\n\r\n<footer class=\"w3-container w3-theme-d5\">\r\n    <p>Powered by <a href=\"https://www.w3schools.com/w3css/default.asp\" target=\"_blank\">w3.css</a></p>\r\n</footer>\r\n</body>\r\n</html>\r\n");

/***/ }),

/***/ "4a+M":
/*!********************************************************!*\
  !*** ./src/app/notification/notification.component.ts ***!
  \********************************************************/
/*! exports provided: NotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationComponent", function() { return NotificationComponent; });
/* harmony import */ var _raw_loader_notification_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./notification.component.html */ "J9ra");
/* harmony import */ var _notification_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.component.scss */ "pPHB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/notification.service */ "1liP");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(notificationService) {
        this.notificationService = notificationService;
        this.notifications = [];
        this.checkNotify = false;
        this.visible = false;
    }
    NotificationComponent.prototype.ngOnInit = function () {
        this.getNotification();
    };
    NotificationComponent.prototype.getNotification = function () {
        var _this = this;
        this.notificationService.getNotify().subscribe(function (data) {
            _this.notifications = data;
        });
    };
    NotificationComponent.prototype.getPostNotification = function (id) {
        var _this = this;
        this.notificationService.getPostNotification(id).subscribe(function (data) {
            _this.checkNotify = true;
            _this.post = data;
        });
    };
    NotificationComponent.prototype.check1 = function () {
        this.checkNotify = false;
        this.getNotification();
    };
    NotificationComponent.prototype.open = function () {
        this.visible = true;
    };
    NotificationComponent.prototype.close = function () {
        this.visible = false;
    };
    NotificationComponent.ctorParameters = function () { return [
        { type: _service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"] }
    ]; };
    NotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-notification',
            template: _raw_loader_notification_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_notification_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])
    ], NotificationComponent);
    return NotificationComponent;
}());



/***/ }),

/***/ "4upH":
/*!****************************************************************!*\
  !*** ./src/app/change-password/change-password.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "6uu6":
/*!*****************************************!*\
  !*** ./src/app/service/auth.service.ts ***!
  \*****************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment.prod */ "cxbk");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignInForm = /** @class */ (function () {
    function SignInForm() {
    }
    return SignInForm;
}());
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        // Api local
        this.API_SIGNUP = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'signup';
        this.API_SIGNIN = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'signin';
        this.API_POST = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'createPost';
        this.API_SHOWPOST = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'showPost';
        this.API_CHANGE_PROFILE = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'change-profile';
        this.API_CHANGE_AVATAR = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'change-avatar';
        this.API_CHANGE_PASSWORD = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'change-password';
        this.API_SHOW_POST_PROFILE = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'showPostProfile';
        this.API_MESS = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'getMess';
        this.API_SHOW_MESSAGE = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'showMess';
    }
    AuthService.prototype.createPost = function (post) {
        return this.http.post(this.API_POST, post);
    };
    AuthService.prototype.showListPost = function () {
        return this.http.get(this.API_SHOWPOST);
    };
    AuthService.prototype.signup = function (signUp) {
        return this.http.post(this.API_SIGNUP, signUp);
    };
    AuthService.prototype.signin = function (signIn) {
        return this.http.post(this.API_SIGNIN, signIn);
    };
    AuthService.prototype.changeAvatar = function (info) {
        return this.http.put(this.API_CHANGE_AVATAR, info);
    };
    AuthService.prototype.changeProfile = function (info) {
        return this.http.put(this.API_CHANGE_PROFILE, info);
    };
    AuthService.prototype.changePassword = function (info) {
        return this.http.put(this.API_CHANGE_PASSWORD, info);
    };
    AuthService.prototype.showPostProfile = function () {
        return this.http.get(this.API_SHOW_POST_PROFILE);
    };
    AuthService.prototype.setData = function (data) {
        this.data = data;
    };
    AuthService.prototype.getData = function () {
        return this.data;
    };
    AuthService.prototype.getMess = function () {
        return this.http.get(this.API_MESS);
    };
    AuthService.prototype.showMessage = function (count) {
        return this.http.get(this.API_SHOW_MESSAGE + '/' + count);
    };
    AuthService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "7Rwp":
/*!***********************************!*\
  !*** ./src/app/model/PostForm.ts ***!
  \***********************************/
/*! exports provided: PostForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostForm", function() { return PostForm; });
var PostForm = /** @class */ (function () {
    function PostForm(content, status, imageUrl) {
        this.content = content;
        this.status = status;
        this.imageUrl = imageUrl;
    }
    return PostForm;
}());



/***/ }),

/***/ "8+yW":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/friend/show-add-friend/show-add-friend.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n<!--            <mat-card style=\"margin: 50px 0\">-->\r\n<!--                <mat-card-title align=\"center\" class=\"alert alert-primary\"></mat-card-title>-->\r\n                <div class=\"row\">\r\n                    <div class=\"column\" *ngFor=\"let user of users\">\r\n<!--                        <div class=\"card\">-->\r\n                            <i style=\"font-size: 1.5vw; color: crimson\">{{user.fullName}}</i><br>\r\n                            <img style=\"width: 120px; height: 120px\" class=\"img\" [src]=\"user.avatarUrl\">\r\n                            <button (click)=\"addFriend(user.id)\" class=\"w3-button w3-block w3-green w3-section\"\r\n                                    title=\"Accept\"><i class=\"fa fa-check\"></i>Add\r\n                            </button>\r\n                            <button (click)=\"refuse(user.id)\" class=\"w3-button w3-block w3-red w3-section\"\r\n                                    title=\"Decline\"><i class=\"fa fa-remove\"></i>Decline\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n<!--            </mat-card>-->\r\n        </div>\r\n    </div>\r\n<!--</div>-->\r\n\r\n\r\n");

/***/ }),

/***/ "8UNf":
/*!*****************************************!*\
  !*** ./src/app/service/like.service.ts ***!
  \*****************************************/
/*! exports provided: LikeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LikeService", function() { return LikeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment.prod */ "cxbk");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LikeService = /** @class */ (function () {
    function LikeService(http) {
        this.http = http;
        this.API_CREATE_LIKE = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'likeshow';
        this.API_SUM_LIKE = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'listlike';
    }
    LikeService.prototype.createLike = function (id) {
        return this.http.get(this.API_CREATE_LIKE + '/' + id);
    };
    LikeService.prototype.sumLike = function (id) {
        return this.http.get(this.API_SUM_LIKE + '/' + id);
    };
    LikeService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    LikeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], LikeService);
    return LikeService;
}());



/***/ }),

/***/ "9vUh":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _raw_loader_home_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./home.component.html */ "Gd4t");
/* harmony import */ var _home_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.component.scss */ "bdh1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _model_SignInForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/SignInForm */ "dwZW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/token.service */ "/QNy");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/auth.service */ "6uu6");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, tokenService, router) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.router = router;
        this.hide = true;
        this.form = {};
        this.checkRegister = false;
        this.checkLoginFailed = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        if (this.authService.getData()) {
            this.checkRegister = true;
        }
    };
    HomeComponent.prototype.ngSubmit = function () {
        var _this = this;
        this.signInForm = new _model_SignInForm__WEBPACK_IMPORTED_MODULE_3__["SignInForm"](this.form.username, this.form.password);
        this.authService.signin(this.signInForm).subscribe(function (data) {
            if (data.token != undefined) {
                _this.tokenService.setToken(data.token);
                _this.tokenService.setFullName(data.fullName);
                _this.tokenService.setRole(data.roles);
                _this.tokenService.setAvatarUrl(data.avatarUrl);
                _this.router.navigate(['user-account']).then(function () {
                });
            }
        });
    };
    HomeComponent.ctorParameters = function () { return [
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-home',
            template: _raw_loader_home_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_home_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _service_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BXUW":
/*!********************************************************!*\
  !*** ./src/app/adminManage/dialog/dialog.component.ts ***!
  \********************************************************/
/*! exports provided: DialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogComponent", function() { return DialogComponent; });
/* harmony import */ var _raw_loader_dialog_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./dialog.component.html */ "Wp/u");
/* harmony import */ var _dialog_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialog.component.scss */ "YpQl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialogComponent = /** @class */ (function () {
    function DialogComponent() {
    }
    DialogComponent.prototype.ngOnInit = function () {
    };
    DialogComponent.ctorParameters = function () { return []; };
    DialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-dialog',
            template: _raw_loader_dialog_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_dialog_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [])
    ], DialogComponent);
    return DialogComponent;
}());



/***/ }),

/***/ "D8yN":
/*!**************************************************************!*\
  !*** ./src/app/change-profile/change-profile.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".change-profile {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNoYW5nZS1wcm9maWxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7QUFDRiIsImZpbGUiOiJjaGFuZ2UtcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGFuZ2UtcHJvZmlsZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "DsRI":
/*!******************************************!*\
  !*** ./src/app/chat/chat.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGF0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "G5HF":
/*!**********************************************************!*\
  !*** ./src/app/upload-avatar/upload-avatar.component.ts ***!
  \**********************************************************/
/*! exports provided: UploadAvatarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadAvatarComponent", function() { return UploadAvatarComponent; });
/* harmony import */ var _raw_loader_upload_avatar_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./upload-avatar.component.html */ "igCA");
/* harmony import */ var _upload_avatar_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload-avatar.component.scss */ "UmDs");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/storage */ "Vaw3");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UploadAvatarComponent = /** @class */ (function () {
    function UploadAvatarComponent(afStorage) {
        this.afStorage = afStorage;
        this.checkUploadAvatar = false;
        this.listIMG = [];
        this.myMap = new Map();
        this.giveURLtoCreate = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
    }
    UploadAvatarComponent.prototype.ngOnInit = function () {
    };
    //Khi upload file qua thẻ input dưới dạng 1 hoặc nhiều file thì tệp đó thông qua sự kiện (change) $event được kích hoạt. Và tất cả file upload sẽ lưu trữ
    // trong $event.target.files.
    UploadAvatarComponent.prototype.onFileChanged = function ($event) {
        var files = $event.target.files;
        if (files.length === 1) {
            // this.selectedFile = files[0];
            this.onUpload(files[0]);
        }
        else {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                this.onUpload(file);
            }
        }
    };
    UploadAvatarComponent.prototype.onUpload = function (file) {
        var _this = this;
        this.checkUploadAvatar = true;
        var id = Math.random().toString(36).substring(2); //Tạo ra 1 name riêng cho mỗi DB firebase;
        this.ref = this.afStorage.ref(id);
        this.ref.put(file).then(function (snapshot) {
            return snapshot.ref.getDownloadURL(); //Tra ve 1 chuoi sieu van ban tren FB.
        }).then(function (downloadURL) {
            _this.giveURLtoCreate.emit(downloadURL);
            _this.checkUploadAvatar = false;
        })
            .catch(function (error) {
            console.log("Failed to upload avatar and get link " + error);
        });
    };
    UploadAvatarComponent.ctorParameters = function () { return [
        { type: _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"] }
    ]; };
    UploadAvatarComponent.propDecorators = {
        giveURLtoCreate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }]
    };
    UploadAvatarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-upload-avatar',
            template: _raw_loader_upload_avatar_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_upload_avatar_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"]])
    ], UploadAvatarComponent);
    return UploadAvatarComponent;
}());



/***/ }),

/***/ "Gd4t":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" style=\"background: url(https://images5.alphacoders.com/689/689595.jpg);width: 120%;height: 100%\">\r\n    <div class=\"row\">\r\n        <div class=\"col-4\" style=\"margin-top: 170px;margin-left: 650px\">\r\n            <mat-card>\r\n                <form class=\"form-login\" #f=\"ngForm\" (ngSubmit)=\"f.form.valid&&ngSubmit()\" novalidate>\r\n                    <mat-error *ngIf=\"checkRegister\" class=\"alert alert-primary\">Create Account Success! Please\r\n                        login\r\n                    </mat-error>\r\n                    <mat-error *ngIf=\"checkLoginFailed\" class=\"alert alert-danger\">Login Failed! Please check your\r\n                        username or password\r\n                    </mat-error>\r\n                    <!-- USERNAME -->\r\n                    <mat-form-field style=\"width: 300px\" appearance=\"outline\">\r\n                        <mat-label>Username:</mat-label>\r\n                        <input name=\"username\" [(ngModel)]=\"form.username\" matInput placeholder=\"Placeholder\"\r\n                               #username=\"ngModel\">\r\n                        <mat-icon color=\"accent\" matSuffix>person_outline</mat-icon>\r\n                        <mat-error *ngIf=\"username.hasError('required')\">The username is required!</mat-error>\r\n                        <mat-error *ngIf=\"username.hasError('minlength')\">The name must more than 3 character\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!--PASSWORD -->\r\n                    <mat-form-field style=\"width: 300px\" appearance=\"outline\">\r\n                        <mat-label>Enter your password</mat-label>\r\n                        <input name=\"password\" [(ngModel)]=\"form.password\" matInput\r\n                               [type]=\"hide ? 'password' : 'text'\"\r\n                               #password=\"ngModel\" >\r\n                        <button mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\r\n                                [attr.aria-pressed]=\"hide\">\r\n                            <mat-icon color=\"accent\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\r\n                        </button>\r\n                        <mat-error *ngIf=\"password.hasError('required')\">The password is required!</mat-error>\r\n                        <mat-error *ngIf=\"password.hasError('minlength')\">The password must more than 6 character\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <button mat-stroked-button color=\"accent\" class=\"mat-button-toggle-group btn-outline-primary\">\r\n                        LOGIN\r\n                        <mat-icon color=\"accent\" matSuffix>login</mat-icon>\r\n                    </button>\r\n                    <br><br>\r\n                    <button routerLink=\"/register\" mat-stroked-button color=\"accent\"\r\n                            class=\"mat-button-toggle-group btn-outline-success\">REGISTER\r\n                    </button>\r\n                </form>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "H3yn":
/*!*****************************************!*\
  !*** ./src/app/model/ChangePassword.ts ***!
  \*****************************************/
/*! exports provided: ChangePassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePassword", function() { return ChangePassword; });
var ChangePassword = /** @class */ (function () {
    function ChangePassword(currentPassword, newPassword, confirmPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
    return ChangePassword;
}());



/***/ }),

/***/ "HKja":
/*!*******************************************************!*\
  !*** ./src/app/form-login/login/login.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form-login {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxsb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FBQ0YiLCJmaWxlIjoibG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9ybS1sb2dpbiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4iXX0= */");

/***/ }),

/***/ "He27":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/change-password/change-password.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12 \" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 50px 0;\">\r\n                <form (ngSubmit)=\"f.form.valid && ngSubmit()\" #f=\"ngForm\" [formGroup]=\"myForm\" class=\"change-pass\" novalidate>\r\n                    <mat-error class=\"alert alert-primary\">{{status}}</mat-error>\r\n                    <mat-form-field style=\" width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Enter your Current Password</mat-label>\r\n                        <input name=\"password\" matInput [type]=\"hide ? 'password' : 'text'\"\r\n                               formControlName=\"currentPassword\"\r\n                               [(ngModel)]=\"changePassWord.currentPassword\"\r\n                               required>\r\n                        <button mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\r\n                                [attr.aria-pressed]=\"hide\">\r\n                            <mat-icon color=\"accent\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\r\n                        </button>\r\n                        <mat-error *ngIf=\"myForm.hasError('required', 'currentPassword')\">\r\n                            Please enter your Current Password\r\n                        </mat-error>\r\n                    </mat-form-field> <br>\r\n\r\n                    <mat-form-field style=\" width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Enter New Password</mat-label>\r\n                        <input name=\"password\" matInput [type]=\"hide ? 'password' : 'text'\"\r\n                               formControlName=\"newPassword\"\r\n                               [(ngModel)]=\"changePassWord.newPassword\"\r\n                               required [errorStateMatcher]=\"matcher\">\r\n                        <button mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\r\n                                [attr.aria-pressed]=\"hide\">\r\n                            <mat-icon color=\"accent\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\r\n                        </button>\r\n                        <mat-error *ngIf=\"myForm.hasError('required', 'newPassword')\">\r\n                            Please enter your New Password\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <mat-form-field style=\" width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Enter Confirm Password </mat-label>\r\n                        <input name=\"password\" matInput [type]=\"hide ? 'password' : 'text'\"\r\n                               formControlName=\"confirmPassword\"\r\n                               [(ngModel)]=\"changePassWord.confirmPassword\"\r\n                               [errorStateMatcher]=\"matcher\" required>\r\n                        <button mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\r\n                                [attr.aria-pressed]=\"hide\">\r\n                            <mat-icon color=\"accent\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\r\n                        </button>\r\n                        <mat-error *ngIf=\"myForm.hasError('notSame')\">\r\n                            The Confirm Password does not match the New Password\r\n                        </mat-error>\r\n                    </mat-form-field> <br>\r\n                    <button mat-stroked-button color=\"accent\" class=\"mat-button-toggle-group btn-outline-primary\">Change Password\r\n                        <mat-icon color=\"accent\" matSuffix>lock_open</mat-icon>\r\n                    </button>\r\n                    <button routerLink=\"/login\">Back Login</button>\r\n                    <span class=\"example-spacer\"></span>\r\n                    <span class=\"example-spacer\"></span>\r\n                    <br> <br>\r\n                    <ng-template #Error>\r\n                        <mat-error *ngIf=\"f.submitted&&isChangePassed\">\r\n                            <mat-card-subtitle style=\"color: red\">\r\n                                Change Pass Failled! Please check Current Password: \"{{changePassWord.currentPassword}}\"\r\n                                \"does not match your Old Password!\r\n                            </mat-card-subtitle>\r\n                        </mat-error>\r\n                    </ng-template>\r\n                    <mat-error *ngIf=\"!(f.submitted&&isChangePassed); else Error\"></mat-error>\r\n                </form>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "I/Hr":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/search/search.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 0px 0\">\r\n                <div class=\"row\">\r\n                    <div class=\"column\" *ngFor=\"let user of users index as i\">\r\n                        <i style=\"font-size: 1.5vw; color: crimson\">{{user.fullName}}</i>\r\n                        <nz-avatar class=\"w3-center w3-circle w3-margin-right\" [nzSize]=\"110\" nzIcon=\"user\"\r\n                                   nzSrc=\"{{user.avatarUrl}}\"></nz-avatar><br><br>\r\n                        <button (click)=\"addFriend(user.id, i)\" nz-button nzType=\"danger\" [nzSize]=\"\" nzShape=\"round\">\r\n                            <i nz-icon nzType=\"download\"></i>\r\n                            Add Friend\r\n                        </button>\r\n                        <hr>\r\n                    </div>\r\n                </div>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "I11r":
/*!***************************************************************!*\
  !*** ./src/app/friend/list-friend/list-friend.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaXN0LWZyaWVuZC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "J9ra":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/notification/notification.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 5px\">\r\n            <mat-card style=\"margin: 0px 0; text-align: center\">\r\n                <div class=\"row\">\r\n                    <div class=\"column\" *ngFor=\"let notification of notifications\">\r\n                        <div class=\"card\">\r\n                            <a (click)=\"getPostNotification(notification.postId)\">{{notification.notify}}</a>\r\n                        </div>\r\n                    </div>\r\n                    <div *ngIf=\"checkNotify\">\r\n                        <span nz-tooltip nzTooltipTitle=\"{{post.content}}\">Content: </span><br>\r\n                        <span nz-tooltip nzTooltipTitle=\"{{post.likeList.length}}\">Like: </span><br>\r\n                        <span nz-tooltip nzTooltipTitle=\"{{post.commentList.length}}\">Comment: </span>\r\n                        <hr>\r\n                        <p>Content: {{post.content}}</p>\r\n                        <p>{{post.likeList.length}} Like:</p>\r\n                        <p>{{post.commentList.length}} Comment:</p>\r\n                        <a (click)=\"check1()\">Hiden Post</a>\r\n                    </div>\r\n                </div>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!--<button nz-button nzType=\"primary\" (click)=\"open()\">Open</button>-->\r\n<!--<nz-drawer-->\r\n<!--        [nzClosable]=\"false\"-->\r\n<!--        [nzVisible]=\"visible\"-->\r\n<!--        nzPlacement=\"right\"-->\r\n<!--        nzTitle=\"Basic Drawer\"-->\r\n<!--        (nzOnClose)=\"close()\"-->\r\n<!--&gt;-->\r\n<!--    <ng-container *nzDrawerContent>-->\r\n<!--        <p>Some contents...</p>-->\r\n<!--        <p>Some contents...</p>-->\r\n<!--        <p>Some contents...</p>-->\r\n<!--    </ng-container>-->\r\n<!--</nz-drawer>-->\r\n");

/***/ }),

/***/ "KLmy":
/*!******************************************!*\
  !*** ./src/app/service/admin.service.ts ***!
  \******************************************/
/*! exports provided: AdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminService", function() { return AdminService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment.prod */ "cxbk");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
        this.API_PAGE_USER = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'page-user';
        this.API_CHANGE_ROLE = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'block';
        this.API_SUGGESTIONS = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].API_LOCAL + 'page-user2';
    }
    AdminService.prototype.pageUser = function (request) {
        var params = request;
        return this.http.get(this.API_PAGE_USER, { params: params });
    };
    AdminService.prototype.changeRoleUser = function (id) {
        // @ts-ignore
        return this.http.put(this.API_CHANGE_ROLE + "/" + id);
    };
    AdminService.prototype.suggestions = function () {
        return this.http.get(this.API_SUGGESTIONS);
    };
    AdminService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    AdminService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AdminService);
    return AdminService;
}());



/***/ }),

/***/ "KyF4":
/*!**********************************************!*\
  !*** ./src/app/security/auth.interceptor.ts ***!
  \**********************************************/
/*! exports provided: AuthInterceptor, httpInterceptorProviders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "httpInterceptorProviders", function() { return httpInterceptorProviders; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/token.service */ "/QNy");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TOKEN_HEADER_KEY = 'Authorization';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(tokenService) {
        this.tokenService = tokenService;
    }
    AuthInterceptor.prototype.intercept = function (request, next) {
        var authReq = request;
        var token = this.tokenService.getToken();
        if (token != null) {
            authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer' + token) });
        }
        return next.handle(authReq);
    };
    AuthInterceptor.ctorParameters = function () { return [
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_2__["TokenService"] }
    ]; };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_service_token_service__WEBPACK_IMPORTED_MODULE_2__["TokenService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());

var httpInterceptorProviders = [
    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"], useClass: AuthInterceptor, multi: true }
];


/***/ }),

/***/ "MTN8":
/*!******************************************!*\
  !*** ./src/app/like/like.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaWtlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "Nqhu":
/*!***********************************************************************!*\
  !*** ./src/app/friend/show-add-friend/show-add-friend.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaG93LWFkZC1mcmllbmQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "O6X8":
/*!**********************************************!*\
  !*** ./src/app/security/can-active.guard.ts ***!
  \**********************************************/
/*! exports provided: CanActiveGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanActiveGuard", function() { return CanActiveGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CanActiveGuard = /** @class */ (function () {
    function CanActiveGuard(router) {
        this.router = router;
    }
    CanActiveGuard.prototype.canActivate = function (route, state) {
        var token = window.sessionStorage.getItem('Token_Key');
        if (token != null) {
            return true;
        }
        else {
            return this.router.navigate(['/login']);
        }
    };
    CanActiveGuard.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    CanActiveGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], CanActiveGuard);
    return CanActiveGuard;
}());



/***/ }),

/***/ "PRPk":
/*!*************************************************************!*\
  !*** ./src/app/form-login/register/register.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form-register {\n  text-align: center;\n}\n\n#p {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxyZWdpc3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtBQUVGIiwiZmlsZSI6InJlZ2lzdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tcmVnaXN0ZXIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4jcHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "SZ1T":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/adminManage/admin-manager/admin-manager.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"w3-row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <div class=\"row\">\r\n                <span nz-typography nzType=\"danger\">Account Manager</span><br>\r\n                <div class=\"column\" *ngFor=\"let user of users index as i\">\r\n                    <hr>\r\n                    <span nz-typography nzType=\"warning\">Block/Unblock</span>\r\n                    <mat-icon (click)=\"blockUser(i)\" color=\"accent\" matSuffix>no_encryption_gmailerrorred\r\n                    </mat-icon>\r\n                    <hr>\r\n                    <i style=\"font-size: 1.5vw; color: crimson\">{{user.fullName}}</i><br>\r\n                    <span nz-typography nzType=\"warning\">Status:<i\r\n                            style=\"font-size: 1.5vw; color: #dc14c8\">{{user.isActive}}</i></span>\r\n                    <nz-avatar class=\"w3-center w3-circle w3-margin\" [nzSize]=\"120\" nzIcon=\"user\"\r\n                               nzSrc=\"{{user.avatarUrl}}\"></nz-avatar>\r\n                    <br><br>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <mat-paginator [pageSizeOptions]=\"[5,15,30,90]\" [length]=\"totalElements\"\r\n                       (page)=\"nextPage($event)\"></mat-paginator>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(document) {
        this.document = document;
        this.title = 'meta-network';
    }
    AppComponent.prototype.loadStyle = function (styleName) {
        var head = this.document.getElementsByTagName('head')[0];
        var themeLink = this.document.getElementById('client-theme');
        if (themeLink) {
            themeLink.href = styleName;
        }
        else {
            var style = this.document.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.href = "" + styleName;
            head.appendChild(style);
        }
    };
    AppComponent.ctorParameters = function () { return [
        { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"],] }] }
    ]; };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-root',
            template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [Document])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "TEeL":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/change-profile/change-profile.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 50px 0\">\r\n                <form class=\"change-profile\" #f=\"ngForm\" (ngSubmit)=\"f.form.valid &&ngSubmit()\" novalidate>\r\n                    <mat-error class=\"alert alert-primary\">{{status}}</mat-error>\r\n                    <!-- NAME -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Name:</mat-label>\r\n                        <input name=\"name\" [(ngModel)]=\"form.fullName\" #name=\"ngModel\" required minlength=\"3\"\r\n                               maxlength=\"50\" matInput placeholder=\"FullName ...\">\r\n                        <mat-icon color=\"accent\" matSuffix>favorite</mat-icon>\r\n                        <mat-error *ngIf=\"name.hasError('required')\">The name is required!</mat-error>\r\n                        <mat-error *ngIf=\"name.hasError('minlength')\">The name must more than 2 character</mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!-- USERNAME -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Phone:</mat-label>\r\n                        <input name=\"phone\" [(ngModel)]=\"form.phone\" #phone=\"ngModel\" required minlength=\"3\"\r\n                               maxlength=\"50\" matInput placeholder=\"Phone ...\">\r\n                        <mat-icon color=\"accent\" matSuffix>3p</mat-icon>\r\n                        <mat-error *ngIf=\"phone.hasError('required')\">The name is required!</mat-error>\r\n                        <mat-error *ngIf=\"phone.hasError('minlength')\">The name must more than 2 character</mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!-- EMAIL -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Email:</mat-label>\r\n                        <input matInput name=\"email\" [(ngModel)]=\"form.email\" [formControl]=\"emailFormControl\" required>\r\n                        <mat-icon color=\"accent\" matSuffix>email</mat-icon>\r\n                        <mat-error *ngIf=\"emailFormControl.hasError('required')\">The email is required!</mat-error>\r\n                        <mat-error *ngIf=\"emailFormControl.hasError('email')\">The email is valid! Please try Ex:\r\n                            testmail@gmail.com\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <button mat-stroked-button color=\"accent\" class=\"mat-button-toggle-group btn-outline-warning\">Change\r\n                        Profile\r\n                        <mat-icon color=\"accent\" matSuffix>manage_accounts</mat-icon>\r\n                    </button>\r\n                    <button routerLink=\"/login\"  nz-button nzType=\"primary\">\r\n                        Continue...\r\n                        <i nz-icon nzType=\"right\"></i>\r\n                    </button>\r\n                </form>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "UGLl":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/change-avatar/change-avatar.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 50px 0;\">\r\n                <div class=\"change-avatar\">\r\n                    <mat-error class=\"alert alert-primary\">{{status}}</mat-error><br><br>\r\n                    <app-upload-avatar (giveURLtoCreate)=\"onUploadAvatar($event)\"></app-upload-avatar>\r\n                    <form class=\"change-avatar\"  (ngSubmit)=\"onSubmit()\">\r\n                        <button mat-stroked-button color=\"accent\" class=\"mat-button-toggle-group btn-outline-primary\">Change Avatar\r\n                            <mat-icon color=\"accent\" matSuffix>upload_file</mat-icon>\r\n                        </button>\r\n                        <button routerLink=\"/user-account\">Back</button>\r\n                    </form>\r\n                </div>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "Uf94":
/*!**********************************************!*\
  !*** ./src/app/comment/comment.component.ts ***!
  \**********************************************/
/*! exports provided: CommentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentComponent", function() { return CommentComponent; });
/* harmony import */ var _raw_loader_comment_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./comment.component.html */ "q7ca");
/* harmony import */ var _comment_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment.component.scss */ "tUYy");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_comment_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/comment.service */ "iqex");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _model_PostForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/PostForm */ "7Rwp");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CommentComponent = /** @class */ (function () {
    function CommentComponent(fb, commentService) {
        this.fb = fb;
        this.commentService = commentService;
        this.comments = [];
    }
    CommentComponent.prototype.ngOnInit = function () {
        this.commentForm = this.fb.group({
            content: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(3), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].max(1000)]]
        });
    };
    CommentComponent.prototype.ngComment = function () {
        var _this = this;
        this.commentService.createComment(this.post.id, this.commentForm.value).subscribe(function (data) {
            _this.commentForm.reset();
            _this.post.commentList.unshift(data);
        }, function (error) { console.log(error); });
    };
    CommentComponent.prototype.editComment = function (comments) {
        comments.check = true;
    };
    CommentComponent.prototype.deleteComment = function (comments, index) {
        var _this = this;
        this.commentService.deleteComment(comments.id).subscribe(function (data) {
            if (data.code === '200') {
                var i = index;
                var a1 = _this.post.commentList.slice(0, i);
                var a2 = _this.post.commentList.slice(i + 1, _this.post.commentList.length);
                _this.post.commentList = a1.concat(a2).slice(0);
            }
            else {
                console.log('Error');
            }
        }, function (error) { console.log(error); });
    };
    CommentComponent.prototype.submitComment = function (comments) {
        this.commentService.editComment(comments.id, comments).subscribe(function (data) {
            comments.check = false;
        }, function (error) { console.log(error); });
    };
    CommentComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: _service_comment_service__WEBPACK_IMPORTED_MODULE_3__["CommentService"] }
    ]; };
    CommentComponent.propDecorators = {
        post: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    CommentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-comment',
            template: _raw_loader_comment_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_comment_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _service_comment_service__WEBPACK_IMPORTED_MODULE_3__["CommentService"]])
    ], CommentComponent);
    return CommentComponent;
}());



/***/ }),

/***/ "UmDs":
/*!************************************************************!*\
  !*** ./src/app/upload-avatar/upload-avatar.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".column {\n  float: left;\n  width: 33.3%;\n  padding: 10px 10px;\n}\n\n.card {\n  box-shadow: 12px 12px 2px 1px #c0ccca;\n  text-align: center;\n  background-color: #2b3636;\n}\n\ndiv.card {\n  padding: 10px;\n}\n\n.img {\n  width: auto;\n  height: 200px;\n  border-radius: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHVwbG9hZC1hdmF0YXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFFRjs7QUFBQTtFQUNFLGFBQUE7QUFHRjs7QUFEQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFJRiIsImZpbGUiOiJ1cGxvYWQtYXZhdGFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbHVtbiB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgd2lkdGg6IDMzLjMlO1xyXG4gIHBhZGRpbmc6IDEwcHggMTBweDtcclxufVxyXG4uY2FyZCB7XHJcbiAgYm94LXNoYWRvdzogMTJweCAxMnB4IDJweCAxcHggcmdiKDE5MiwgMjA0LCAyMDIpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIzNjM2O1xyXG59XHJcbmRpdi5jYXJkIHtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbi5pbWcge1xyXG4gIHdpZHRoOiBhdXRvO1xyXG4gIGhlaWdodDogMjAwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOCU7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "VX++":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/like/like.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\r\n        <mat-icon  nz-tooltip [nzTooltipTitle]=\"isLiked ? 'like' : 'dislike'\" color=\"accent\" (click)=\"ngLike()\" matSuffix>{{isLiked ? 'thumb_up' : 'thumb_down'}}</mat-icon>{{likes.length}}\r\n        <mat-icon color=\"accent\" matSuffix>chat_bubble</mat-icon>\r\n        <app-comment [post]=\"post\"></app-comment>\r\n</div>\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\r\n<!--<app-footer></app-footer>-->\r\n");

/***/ }),

/***/ "W6KJ":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _raw_loader_profile_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./profile.component.html */ "xwfu");
/* harmony import */ var _profile_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.component.scss */ "bygX");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/auth.service */ "6uu6");
/* harmony import */ var _service_post_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/post.service */ "++6F");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(postService, deletePostService) {
        this.postService = postService;
        this.deletePostService = deletePostService;
        this.listPost = [];
        this.myMap = new Map();
        this.arrImage = [];
        this.arrIConvert = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.showPostProfile();
    };
    ProfileComponent.prototype.showPostProfile = function () {
        var _this = this;
        this.postService.showPostProfile().subscribe(function (data) {
            _this.listPost = data;
            for (var i = 0; i < data.length; i++) {
                _this.arrIConvert = [];
                _this.arrIConvert = data[i].imageUrl.split(',');
                _this.myMap.set(i, _this.arrIConvert);
            }
        });
    };
    ProfileComponent.prototype.deletePosts = function (index, id) {
        var _this = this;
        this.deletePostService.deletePost(id).subscribe(function (data) {
            var i = index;
            var a1 = _this.listPost.slice(0, i);
            var a2 = _this.listPost.slice(i + 1, _this.listPost.length);
            _this.listPost = a1.concat(a2).slice(0);
        });
        this.getListPost();
        ;
    };
    ProfileComponent.prototype.getListPost = function () {
        var _this = this;
        this.postService.showListPost().subscribe(function (data) {
            _this.listPost = data;
        });
    };
    ProfileComponent.ctorParameters = function () { return [
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
        { type: _service_post_service__WEBPACK_IMPORTED_MODULE_4__["PostService"] }
    ]; };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-profile',
            template: _raw_loader_profile_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_profile_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _service_post_service__WEBPACK_IMPORTED_MODULE_4__["PostService"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "WQSX":
/*!*************************************!*\
  !*** ./src/app/model/SignUpForm.ts ***!
  \*************************************/
/*! exports provided: SignUpForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpForm", function() { return SignUpForm; });
var SignUpForm = /** @class */ (function () {
    function SignUpForm(fullName, username, password, re_password, email, phone, dateOfBirth) {
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.re_password = re_password;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.roles = ['user'];
    }
    return SignUpForm;
}());



/***/ }),

/***/ "Wp/u":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/adminManage/dialog/dialog.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 50px 0\">\r\n                <mat-error class=\"alert alert-primary\">Are you sure Delete?</mat-error>\r\n                <button mat-raised-button color=\"primary\" [mat-dialog-close]=\"false\">NO</button>\r\n                <button mat-raised-button color=\"warn\" [mat-dialog-close]=\"true\">YES</button>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "WrJy":
/*!*****************************************************!*\
  !*** ./src/app/form-login/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./login.component.html */ "1/qE");
/* harmony import */ var _login_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component.scss */ "HKja");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _model_SignInForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../model/SignInForm */ "dwZW");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/auth.service */ "6uu6");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/token.service */ "/QNy");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, tokenService, router) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.router = router;
        this.hide = true;
        this.form = {};
        this.checkRegister = false;
        this.checkLoginFailed = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authService.getData()) {
            this.checkRegister = true;
        }
    };
    LoginComponent.prototype.ngSubmit = function () {
        var _this = this;
        this.signInForm = new _model_SignInForm__WEBPACK_IMPORTED_MODULE_3__["SignInForm"](this.form.username, this.form.password);
        this.authService.signin(this.signInForm).subscribe(function (data) {
            if (data.message == 'user_was_blocked') {
                alert('Account is Blocked!!!');
            }
            else {
                if (data.token != undefined) {
                    _this.tokenService.setToken(data.token);
                    _this.tokenService.setFullName(data.fullName);
                    _this.tokenService.setRole(data.roles);
                    _this.tokenService.setAvatarUrl(data.avatarUrl);
                    _this.tokenService.setPhone(data.phone);
                    _this.tokenService.setEmail(data.email);
                    _this.tokenService.setIsActive(data.isActive);
                    _this.router.navigate(['user-account']);
                }
            }
        }, function (error) { return console.log(error); });
    };
    LoginComponent.ctorParameters = function () { return [
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_6__["TokenService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
    ]; };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-login',
            template: _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_login_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _service_token_service__WEBPACK_IMPORTED_MODULE_6__["TokenService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "YpQl":
/*!**********************************************************!*\
  !*** ./src/app/adminManage/dialog/dialog.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkaWFsb2cuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "Z2wJ":
/*!****************************************!*\
  !*** ./src/app/like/like.component.ts ***!
  \****************************************/
/*! exports provided: LikeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LikeComponent", function() { return LikeComponent; });
/* harmony import */ var _raw_loader_like_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./like.component.html */ "VX++");
/* harmony import */ var _like_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./like.component.scss */ "MTN8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _model_PostForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/PostForm */ "7Rwp");
/* harmony import */ var _service_like_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/like.service */ "8UNf");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LikeComponent = /** @class */ (function () {
    function LikeComponent(likeService) {
        this.likeService = likeService;
        this.likes = [];
        this.comments = [];
        this.isLiked = false;
    }
    LikeComponent.prototype.ngOnInit = function () {
        this.sumLike();
    };
    LikeComponent.prototype.ngLike = function () {
        var _this = this;
        console.log(this.post.id);
        this.likeService.createLike(this.post.id).subscribe(function (data) {
            _this.isLiked = !_this.isLiked;
            _this.sumLike();
        });
    };
    LikeComponent.prototype.sumLike = function () {
        var _this = this;
        this.likeService.sumLike(this.post.id).subscribe(function (data) {
            _this.likes = data;
        });
    };
    LikeComponent.ctorParameters = function () { return [
        { type: _service_like_service__WEBPACK_IMPORTED_MODULE_4__["LikeService"] }
    ]; };
    LikeComponent.propDecorators = {
        post: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    LikeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-like',
            template: _raw_loader_like_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_like_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_like_service__WEBPACK_IMPORTED_MODULE_4__["LikeService"]])
    ], LikeComponent);
    return LikeComponent;
}());



/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: appRoutes, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutes", function() { return appRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/slide-toggle */ "1jcm");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _form_login_register_register_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./form-login/register/register.component */ "rDm7");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _form_login_user_account_user_account_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./form-login/user-account/user-account.component */ "ovAZ");
/* harmony import */ var ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-zorro-antd/i18n */ "Rm4T");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_locales_en__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common/locales/en */ "tAZD");
/* harmony import */ var _angular_common_locales_en__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_en__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _security_auth_interceptor__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./security/auth.interceptor */ "KyF4");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _change_profile_change_profile_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./change-profile/change-profile.component */ "arcp");
/* harmony import */ var _upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./upload-file/upload-file.component */ "n9xX");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/fire/storage */ "Vaw3");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../environments/environment.prod */ "cxbk");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _adminManage_admin_manager_admin_manager_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./adminManage/admin-manager/admin-manager.component */ "sEg8");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./search/search.component */ "tq2C");
/* harmony import */ var _form_login_login_login_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./form-login/login/login.component */ "WrJy");
/* harmony import */ var _comment_comment_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./comment/comment.component */ "Uf94");
/* harmony import */ var _like_like_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./like/like.component */ "Z2wJ");
/* harmony import */ var _change_avatar_change_avatar_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./change-avatar/change-avatar.component */ "oW3C");
/* harmony import */ var _upload_avatar_upload_avatar_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./upload-avatar/upload-avatar.component */ "G5HF");
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./change-password/change-password.component */ "0riC");
/* harmony import */ var _friend_show_add_friend_show_add_friend_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./friend/show-add-friend/show-add-friend.component */ "i8Xj");
/* harmony import */ var _friend_list_friend_list_friend_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./friend/list-friend/list-friend.component */ "y5RU");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./profile/profile.component */ "W6KJ");
/* harmony import */ var _friend_friend_request_friend_request_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./friend/friend-request/friend-request.component */ "hM46");
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./notification/notification.component */ "4a+M");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var ng_zorro_antd_avatar__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ng-zorro-antd/avatar */ "ZE2D");
/* harmony import */ var ng_zorro_antd_typography__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ng-zorro-antd/typography */ "eHCX");
/* harmony import */ var ng_zorro_antd_list__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ng-zorro-antd/list */ "Ff2k");
/* harmony import */ var ng_zorro_antd_progress__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ng-zorro-antd/progress */ "W9fG");
/* harmony import */ var ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ng-zorro-antd/select */ "zAKX");
/* harmony import */ var ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ng-zorro-antd/input */ "PTRe");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ng-zorro-antd/button */ "OzZK");
/* harmony import */ var ng_zorro_antd_tooltip__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ng-zorro-antd/tooltip */ "nJia");
/* harmony import */ var ng_zorro_antd_upload__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ng-zorro-antd/upload */ "D9mS");
/* harmony import */ var ng_zorro_antd_auto_complete__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ng-zorro-antd/auto-complete */ "Jioy");
/* harmony import */ var ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ng-zorro-antd/form */ "ocnv");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ng-zorro-antd/grid */ "B+r4");
/* harmony import */ var ng_zorro_antd_drawer__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ng-zorro-antd/drawer */ "F6ss");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./chat/chat.component */ "+XlM");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./security/can-active.guard */ "O6X8");
/* harmony import */ var _adminManage_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./adminManage/dialog/dialog.component */ "BXUW");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























































// @ts-ignore





Object(_angular_common__WEBPACK_IMPORTED_MODULE_21__["registerLocaleData"])(_angular_common_locales_en__WEBPACK_IMPORTED_MODULE_22___default.a);
var appRoutes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_25__["HomeComponent"], data: { title: 'Home' } },
    { path: 'register', component: _form_login_register_register_component__WEBPACK_IMPORTED_MODULE_13__["RegisterComponent"], data: { title: 'Register' } },
    { path: 'login', component: _form_login_login_login_component__WEBPACK_IMPORTED_MODULE_35__["LoginComponent"], data: { title: 'Login' } },
    { path: 'notify', component: _notification_notification_component__WEBPACK_IMPORTED_MODULE_45__["NotificationComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]], data: { title: 'Notify' } },
    { path: 'user-account', component: _form_login_user_account_user_account_component__WEBPACK_IMPORTED_MODULE_19__["UserAccountComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]] },
    { path: 'upload-avatar', component: _upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_27__["UploadFileComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]] },
    { path: "change-role/:id", component: _adminManage_admin_manager_admin_manager_component__WEBPACK_IMPORTED_MODULE_32__["AdminManagerComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]], data: { title: 'Change-Role' } },
    { path: 'change-profile', component: _change_profile_change_profile_component__WEBPACK_IMPORTED_MODULE_26__["ChangeProfileComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]] },
    { path: 'change-avatar', component: _change_avatar_change_avatar_component__WEBPACK_IMPORTED_MODULE_38__["ChangeAvatarComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]] },
    { path: 'change-password', component: _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_40__["ChangePasswordComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]] },
    { path: 'user-profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_43__["ProfileComponent"], canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]] },
    { path: 'chat', component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_60__["ChatComponent"],
        canActivate: [_security_can_active_guard__WEBPACK_IMPORTED_MODULE_62__["CanActiveGuard"]] },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_comment_comment_component__WEBPACK_IMPORTED_MODULE_36__["CommentComponent"], _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _form_login_register_register_component__WEBPACK_IMPORTED_MODULE_13__["RegisterComponent"], _form_login_user_account_user_account_component__WEBPACK_IMPORTED_MODULE_19__["UserAccountComponent"], _form_login_login_login_component__WEBPACK_IMPORTED_MODULE_35__["LoginComponent"], _home_home_component__WEBPACK_IMPORTED_MODULE_25__["HomeComponent"], _change_profile_change_profile_component__WEBPACK_IMPORTED_MODULE_26__["ChangeProfileComponent"],
                _upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_27__["UploadFileComponent"], _adminManage_admin_manager_admin_manager_component__WEBPACK_IMPORTED_MODULE_32__["AdminManagerComponent"], _search_search_component__WEBPACK_IMPORTED_MODULE_34__["SearchComponent"], _like_like_component__WEBPACK_IMPORTED_MODULE_37__["LikeComponent"], _change_avatar_change_avatar_component__WEBPACK_IMPORTED_MODULE_38__["ChangeAvatarComponent"], _upload_avatar_upload_avatar_component__WEBPACK_IMPORTED_MODULE_39__["UploadAvatarComponent"],
                _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_40__["ChangePasswordComponent"], _friend_show_add_friend_show_add_friend_component__WEBPACK_IMPORTED_MODULE_41__["ShowAddFriendComponent"], _friend_list_friend_list_friend_component__WEBPACK_IMPORTED_MODULE_42__["ListFriendComponent"], _profile_profile_component__WEBPACK_IMPORTED_MODULE_43__["ProfileComponent"], _friend_friend_request_friend_request_component__WEBPACK_IMPORTED_MODULE_44__["FriendRequestComponent"], _notification_notification_component__WEBPACK_IMPORTED_MODULE_45__["NotificationComponent"], _chat_chat_component__WEBPACK_IMPORTED_MODULE_60__["ChatComponent"], _adminManage_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_63__["DialogComponent"]],
            imports: [
                _angular_fire_storage__WEBPACK_IMPORTED_MODULE_28__["AngularFireStorageModule"],
                _angular_fire__WEBPACK_IMPORTED_MODULE_29__["AngularFireModule"].initializeApp(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_30__["environment"].firebaseConfig),
                _angular_material_core__WEBPACK_IMPORTED_MODULE_17__["MatNativeDateModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_7__["MatRadioModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__["MatSlideToggleModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes, { useHash: false }), _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormsModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__["MatFormFieldModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ReactiveFormsModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__["MatDatepickerModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_23__["_MatMenuDirectivesModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_23__["MatMenuModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__["MatProgressSpinnerModule"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__["MatPaginatorModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_46__["MatListModule"], ng_zorro_antd_avatar__WEBPACK_IMPORTED_MODULE_47__["NzAvatarModule"], ng_zorro_antd_typography__WEBPACK_IMPORTED_MODULE_48__["NzTypographyModule"],
                ng_zorro_antd_list__WEBPACK_IMPORTED_MODULE_49__["NzListModule"], ng_zorro_antd_progress__WEBPACK_IMPORTED_MODULE_50__["NzProgressModule"], ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_51__["NzSelectModule"], ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_52__["NzInputModule"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_53__["NzButtonModule"], ng_zorro_antd_tooltip__WEBPACK_IMPORTED_MODULE_54__["NzToolTipModule"], ng_zorro_antd_upload__WEBPACK_IMPORTED_MODULE_55__["NzUploadModule"], ng_zorro_antd_auto_complete__WEBPACK_IMPORTED_MODULE_56__["NzAutocompleteModule"],
                ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_57__["NzFormModule"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_58__["NzGridModule"], ng_zorro_antd_drawer__WEBPACK_IMPORTED_MODULE_59__["NzDrawerModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_61__["MatBadgeModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_64__["MatDialogModule"]
            ],
            providers: [{ provide: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_20__["NZ_I18N"], useValue: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_20__["en_US"] }, _security_auth_interceptor__WEBPACK_IMPORTED_MODULE_24__["httpInterceptorProviders"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "arcp":
/*!************************************************************!*\
  !*** ./src/app/change-profile/change-profile.component.ts ***!
  \************************************************************/
/*! exports provided: ChangeProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeProfileComponent", function() { return ChangeProfileComponent; });
/* harmony import */ var _raw_loader_change_profile_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./change-profile.component.html */ "TEeL");
/* harmony import */ var _change_profile_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./change-profile.component.scss */ "D8yN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/token.service */ "/QNy");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/auth.service */ "6uu6");
/* harmony import */ var _model_ChangeProfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/ChangeProfile */ "+dtN");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChangeProfileComponent = /** @class */ (function () {
    function ChangeProfileComponent(authService, tokenService) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.emailFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].email
        ]);
        this.form = {};
        this.status = 'Please fill in the form to change your Profile!';
        this.error2 = {
            message: "noemail"
        };
        this.success = {
            message: "yes"
        };
    }
    ChangeProfileComponent.prototype.ngOnInit = function () {
    };
    ChangeProfileComponent.prototype.ngSubmit = function () {
        var _this = this;
        this.changeProfile = new _model_ChangeProfile__WEBPACK_IMPORTED_MODULE_5__["ChangeProfile"](this.form.fullName, this.form.email, this.form.phone);
        this.authService.changeProfile(this.changeProfile).subscribe(function (data) {
            if (JSON.stringify(data) == JSON.stringify(_this.error2)) {
                _this.status = 'The email is existed! Please try again!';
            }
            if (JSON.stringify(data) == JSON.stringify(_this.success)) {
                _this.status = 'Change Profile success!';
                _this.tokenService.setFullName(_this.form.fullName);
                _this.tokenService.setPhone(_this.form.phone);
                alert('Change profile success! Please login with new username and password');
                _this.tokenService.logOut();
            }
        });
    };
    ChangeProfileComponent.ctorParameters = function () { return [
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_3__["TokenService"] }
    ]; };
    ChangeProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-change-profile',
            template: _raw_loader_change_profile_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_change_profile_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _service_token_service__WEBPACK_IMPORTED_MODULE_3__["TokenService"]])
    ], ChangeProfileComponent);
    return ChangeProfileComponent;
}());



/***/ }),

/***/ "bZIK":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/friend/list-friend/list-friend.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 0px 0\">\r\n                <div class=\"row\">\r\n                    <div class=\"column\" *ngFor=\"let user of users\">\r\n<!--                        <i style=\"font-size: 1.5vw; color: orangered\">{{user.fullName}}</i>-->\r\n                        <nz-avatar class=\"w3-center w3-circle w3-margin-right\" [nzSize]=\"120\" nzIcon=\"user\"\r\n                                   nzSrc=\"{{user.avatarUrl}}\"></nz-avatar><br><br>\r\n                        <button (click)=\"deleteFriend(user.id)\" nz-button nzType=\"warning\" [nzSize]=\"\" nzShape=\"round\">\r\n                            <i nz-icon nzType=\"download\"></i>\r\n                            Delete\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "bdh1":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form-login {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtBQUNGIiwiZmlsZSI6ImhvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9ybS1sb2dpbntcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "busx":
/*!************************************************************!*\
  !*** ./src/app/change-avatar/change-avatar.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGFuZ2UtYXZhdGFyLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "bygX":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".img:hover {\n  transform: scale(2);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHByb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFHRSxtQkFBQTtBQUNGIiwiZmlsZSI6InByb2ZpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nOmhvdmVyIHtcclxuICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgyLjApO1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgyLjApO1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMi4wKTtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "crnd":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "crnd";

/***/ }),

/***/ "cxbk":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    API_LOCAL: 'http://localhost:8080/',
    production: true,
    firebaseConfig: {
        apiKey: 'AIzaSyAm4Dr_WDoOpk4Dwlx_7V0zA0TwT0d8Kxc',
        authDomain: 'learnfirebase-90c9f.firebaseapp.com',
        projectId: 'learnfirebase-90c9f',
        storageBucket: 'learnfirebase-90c9f.appspot.com',
        messagingSenderId: '688931931094',
        appId: '1:688931931094:web:5820df59ff368fd2355a77',
        measurementId: 'G-BGEC9C4YRK'
    },
};


/***/ }),

/***/ "dwZW":
/*!*************************************!*\
  !*** ./src/app/model/SignInForm.ts ***!
  \*************************************/
/*! exports provided: SignInForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignInForm", function() { return SignInForm; });
var SignInForm = /** @class */ (function () {
    function SignInForm(username, password) {
        this.username = username;
        this.password = password;
    }
    return SignInForm;
}());



/***/ }),

/***/ "eVlW":
/*!********************************************************!*\
  !*** ./src/app/upload-file/upload-file.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1cGxvYWQtZmlsZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "gX9c":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/form-login/register/register.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\" style=\"margin-top: 20px\">\r\n            <mat-card style=\"margin: 50px 0\">\r\n                <form class=\"form-register\" #f=\"ngForm\" (ngSubmit)=\"f.form.valid && register()\" novalidate>\r\n                    <mat-error class=\"alert alert-primary\">{{status}}</mat-error>\r\n                    <!-- NAME -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>FullName:</mat-label>\r\n                        <input name=\"name\" [(ngModel)]=\"form.fullName\" matInput placeholder=\"Fullname...\"\r\n                               #name=\"ngModel\" minlength=\"3\" maxlength=\"100\" required>\r\n                        <mat-icon color=\"accent\" matSuffix>person_outline</mat-icon>\r\n                        <mat-error *ngIf=\"name.hasError('required')\">The name is required!</mat-error>\r\n                        <mat-error *ngIf=\"name.hasError('minlength')\">The name must more than 3 character</mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!-- USERNAME -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Username:</mat-label>\r\n                        <input name=\"username\" [(ngModel)]=\"form.username\" matInput placeholder=\"Username...\"\r\n                               #username=\"ngModel\" minlength=\"3\" maxlength=\"100\" required>\r\n                        <mat-icon color=\"accent\" matSuffix>how_to_reg</mat-icon>\r\n                        <mat-error *ngIf=\"username.hasError('required')\">The name is required!</mat-error>\r\n                        <mat-error *ngIf=\"username.hasError('minlength')\">The name must more than 3 character\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!-- EMAIL -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Email:</mat-label>\r\n                        <input name=\"email\" [(ngModel)]=\"form.email\" matInput placeholder=\"Email...\"\r\n                               [formControl]=\"emailFormControl\" required>\r\n                        <mat-icon color=\"accent\" matSuffix>mark_email_read</mat-icon>\r\n                        <mat-error *ngIf=\"emailFormControl.hasError('required')\">The name is required!</mat-error>\r\n                        <mat-error *ngIf=\"emailFormControl.hasError('email')\">The email is invalid! Ex:\r\n                            botherofsnake@gmail.com\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!-- PHONE -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Phone:</mat-label>\r\n                        <input name=\"phone\" [(ngModel)]=\"form.phone\" matInput placeholder=\"Phone Number...\"\r\n                               #phone=\"ngModel\" minlength=\"10\" maxlength=\"11\" required>\r\n                        <mat-icon color=\"accent\" matSuffix>point_of_sale</mat-icon>\r\n                        <mat-error *ngIf=\"phone.hasError('required')\">The phone is required!</mat-error>\r\n                        <mat-error *ngIf=\"phone.hasError('minlength')\">The phone must more than 10 character</mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!--PASSWORD -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Enter your password</mat-label>\r\n                        <input name=\"password\" [(ngModel)]=\"form.password\" matInput [type]=\"hide ? 'password' : 'text'\"\r\n                               #password=\"ngModel\" required minlength=\"6\" maxlength=\"100\">\r\n                        <button mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\r\n                                [attr.aria-pressed]=\"hide\">\r\n                            <mat-icon color=\"accent\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\r\n                        </button>\r\n                        <mat-error *ngIf=\"password.hasError('required')\">The password is required!</mat-error>\r\n                        <mat-error *ngIf=\"password.hasError('minlength')\">The password must more than 6 character\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!--RE-PASSWORD -->\r\n                    <mat-form-field style=\"width: 350px\" appearance=\"outline\">\r\n                        <mat-label>Enter your re-password</mat-label>\r\n                        <input *ngIf=\"!check_password\" name=\"re_password\" [(ngModel)]=\"form.re_password\" matInput\r\n                               [type]=\"hide ? 'password' : 'text'\" #re_password=\"ngModel\" required minlength=\"6\"\r\n                               maxlength=\"100\">\r\n                        <button mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\r\n                                [attr.aria-pressed]=\"hide\">\r\n                            <mat-icon color=\"accent\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\r\n                        </button>\r\n                        <mat-error *ngIf=\"password.hasError('required')\">The password is required!</mat-error>\r\n                        <mat-error *ngIf=\"password.hasError('minlength')\">The password must more than 6 character\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <!--                    Date Of Birth-->\r\n                    <mat-form-field style=\"width: 350px\" color=\"accent\" appearance=\"outline\">\r\n                        <mat-label>Date Of Birth:</mat-label>\r\n                        <input matInput name=\"dateOfBirth\" [matDatepicker]=\"date\" [(ngModel)]=\"form.dateOfBirth\"\r\n                               required>\r\n                        <mat-datepicker-toggle style=\"color: #f92672\" matSuffix [for]=\"date\"></mat-datepicker-toggle>\r\n                        <mat-datepicker #date></mat-datepicker>\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <button mat-stroked-button color=\"accent\" class=\"mat-button-toggle-group btn-outline-primary\">\r\n                        Register\r\n                        <mat-icon color=\"accent\" matSuffix>done_all</mat-icon>\r\n                    </button>\r\n                </form>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "gwg2":
/*!***************************************!*\
  !*** ./src/app/model/ChangeAvatar.ts ***!
  \***************************************/
/*! exports provided: ChangeAvatar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeAvatar", function() { return ChangeAvatar; });
var ChangeAvatar = /** @class */ (function () {
    function ChangeAvatar(avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
    return ChangeAvatar;
}());



/***/ }),

/***/ "hM46":
/*!*******************************************************************!*\
  !*** ./src/app/friend/friend-request/friend-request.component.ts ***!
  \*******************************************************************/
/*! exports provided: FriendRequestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FriendRequestComponent", function() { return FriendRequestComponent; });
/* harmony import */ var _raw_loader_friend_request_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./friend-request.component.html */ "1ZZG");
/* harmony import */ var _friend_request_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./friend-request.component.scss */ "0O+I");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_friend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/friend.service */ "rY/d");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FriendRequestComponent = /** @class */ (function () {
    function FriendRequestComponent(friendService) {
        this.friendService = friendService;
        this.users = [];
    }
    FriendRequestComponent.prototype.ngOnInit = function () {
        this.getFriendRequest();
    };
    FriendRequestComponent.prototype.getFriendRequest = function () {
        var _this = this;
        this.friendService.showFriendRequest().subscribe(function (data) {
            _this.users = data;
        });
    };
    FriendRequestComponent.prototype.deleteRequest = function (id) {
        var _this = this;
        this.friendService.deleteRequest(id).subscribe(function (data) {
            console.log(data, "friend bị thu hồi");
            _this.getFriendRequest();
        });
    };
    FriendRequestComponent.ctorParameters = function () { return [
        { type: _service_friend_service__WEBPACK_IMPORTED_MODULE_3__["FriendService"] }
    ]; };
    FriendRequestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-friend-request',
            template: _raw_loader_friend_request_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_friend_request_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_friend_service__WEBPACK_IMPORTED_MODULE_3__["FriendService"]])
    ], FriendRequestComponent);
    return FriendRequestComponent;
}());



/***/ }),

/***/ "i8Xj":
/*!*********************************************************************!*\
  !*** ./src/app/friend/show-add-friend/show-add-friend.component.ts ***!
  \*********************************************************************/
/*! exports provided: ShowAddFriendComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowAddFriendComponent", function() { return ShowAddFriendComponent; });
/* harmony import */ var _raw_loader_show_add_friend_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./show-add-friend.component.html */ "8+yW");
/* harmony import */ var _show_add_friend_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show-add-friend.component.scss */ "Nqhu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_friend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/friend.service */ "rY/d");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShowAddFriendComponent = /** @class */ (function () {
    function ShowAddFriendComponent(friendService) {
        this.friendService = friendService;
        this.users = [];
    }
    ShowAddFriendComponent.prototype.ngOnInit = function () {
        this.getListAddFriend();
    };
    ShowAddFriendComponent.prototype.getListAddFriend = function () {
        var _this = this;
        this.friendService.showAddFriend().subscribe(function (data) {
            _this.users = data;
        });
    };
    ShowAddFriendComponent.prototype.addFriend = function (id) {
        var _this = this;
        this.friendService.confirm(id).subscribe(function (data) {
            console.log(data);
            _this.getListAddFriend();
        });
    };
    ShowAddFriendComponent.prototype.refuse = function (id) {
        var _this = this;
        this.friendService.refuse(id).subscribe(function (data) {
            console.log(data, 'refuse');
            _this.getListAddFriend();
        });
    };
    ShowAddFriendComponent.ctorParameters = function () { return [
        { type: _service_friend_service__WEBPACK_IMPORTED_MODULE_3__["FriendService"] }
    ]; };
    ShowAddFriendComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-show-add-friend',
            template: _raw_loader_show_add_friend_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_show_add_friend_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_friend_service__WEBPACK_IMPORTED_MODULE_3__["FriendService"]])
    ], ShowAddFriendComponent);
    return ShowAddFriendComponent;
}());



/***/ }),

/***/ "igCA":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/upload-avatar/upload-avatar.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\r\n    <input type=\"file\" multiple (change)=\"onFileChanged($event)\">\r\n    <nz-progress *ngIf=\"checkUploadAvatar\" [nzPercent]=\"0.01\" [nzStrokeColor]=\"{ '0%': '#ab60ce', '100%': '#cb1c90' }\"></nz-progress>\r\n    <div class=\"row\">\r\n        <div class=\"column\" *ngFor=\"let song of listIMG; let a = index\">\r\n            <div class=\"card\">\r\n                <img class=\"img\" [src]=\"myMap.get(a)\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "iqex":
/*!********************************************!*\
  !*** ./src/app/service/comment.service.ts ***!
  \********************************************/
/*! exports provided: CommentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentService", function() { return CommentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment.prod */ "cxbk");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommentService = /** @class */ (function () {
    function CommentService(http) {
        this.http = http;
        this.API_CREATE_COMMENT = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'comment';
        // private API_LIST_COMMENT = environment.API_LOCAL + 'showComment';
        this.API_EDIT_COMMENT = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'updatecomment';
        this.API_DELETE_COMMENT = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'deletecomment';
    }
    CommentService.prototype.createComment = function (id, comment) {
        return this.http.post(this.API_CREATE_COMMENT + '/' + id, comment);
    };
    CommentService.prototype.editComment = function (id, comment) {
        return this.http.put(this.API_EDIT_COMMENT + '/' + id, comment);
    };
    CommentService.prototype.deleteComment = function (id) {
        return this.http.delete(this.API_DELETE_COMMENT + '/' + id);
    };
    CommentService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    CommentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CommentService);
    return CommentService;
}());



/***/ }),

/***/ "mTh2":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div>\r\n    <div *ngFor=\"let c of chats\">\r\n        <div>\r\n            <p><strong>{{c.name}}</strong>: {{c.message}}</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div style=\"color: blue; text-align: center\">\r\n    <h1>{{title}}</h1>\r\n    <h3>{{description}}</h3>\r\n</div>\r\n<div class=\"container\" style=\"width: 400px; margin-top: 20px;\">\r\n    <form class=\"form-inline\" style=\"margin-top: 20px;\">\r\n        <div class=\"form-group\">\r\n            <input placeholder=\"nhập tin nhắn...\" type=\"text\" name=\"name\" class=\"form-control\" [(ngModel)]=\"message\"\r\n                   (keyup)=\"$event.keyCode ===13 && sendName()\"/>\r\n        </div>\r\n        <button id=\"send\" class=\"btn btn-default\" type=\"button\" (click)=\"sendName()\">Send</button>\r\n    </form>\r\n\r\n    <table id=\"conversation\" class=\"table table-striped\" style=\"margin-top: 20px;\">\r\n        <thead>\r\n        <tr>\r\n            <th>Loading</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody *ngFor=\"let greeting of greetings\">\r\n        <tr>\r\n            <td>{{greeting}}</td>\r\n        </tr>\r\n        </tbody>\r\n    </table>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "n9xX":
/*!******************************************************!*\
  !*** ./src/app/upload-file/upload-file.component.ts ***!
  \******************************************************/
/*! exports provided: UploadFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFileComponent", function() { return UploadFileComponent; });
/* harmony import */ var _raw_loader_upload_file_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./upload-file.component.html */ "0k0u");
/* harmony import */ var _upload_file_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload-file.component.scss */ "eVlW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/storage */ "Vaw3");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UploadFileComponent = /** @class */ (function () {
    function UploadFileComponent(afStorage) {
        this.afStorage = afStorage;
        this.checkUploadAvatar = false;
        this.giveURLtoCreate = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
    }
    UploadFileComponent.prototype.ngOnInit = function () {
        this.downloadURL = '';
    };
    //Khi upload file qua thẻ input dưới dạng 1 hoặc nhiều file thì tệp đó thông qua sự kiện (change) $event được kích hoạt. Và tất cả file upload sẽ lưu trữ
    // trong $event.target.files.
    UploadFileComponent.prototype.onFileChanged = function ($event) {
        this.selectedFile = $event.target.files[0];
        this.onUpload();
    };
    UploadFileComponent.prototype.onUpload = function () {
        var _this = this;
        this.checkUploadAvatar = true;
        var id = Math.random().toString(36).substring(2); //Tạo ra 1 name riêng cho mỗi DB firebase;
        this.ref = this.afStorage.ref(id);
        this.ref.put(this.selectedFile).then(function (snapshot) {
            return snapshot.ref.getDownloadURL(); //Tra ve 1 chuoi sieu van ban tren FB.
        }).then(function (downloadURL) {
            _this.downloadURL = downloadURL;
            _this.giveURLtoCreate.emit(_this.downloadURL);
            _this.checkUploadAvatar = false;
            return downloadURL;
        })
            .catch(function (error) {
            console.log("Failed to upload avatar and get link " + error);
        });
    };
    UploadFileComponent.ctorParameters = function () { return [
        { type: _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"] }
    ]; };
    UploadFileComponent.propDecorators = {
        giveURLtoCreate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }]
    };
    UploadFileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-upload-file',
            template: _raw_loader_upload_file_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_upload_file_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"]])
    ], UploadFileComponent);
    return UploadFileComponent;
}());



/***/ }),

/***/ "oW3C":
/*!**********************************************************!*\
  !*** ./src/app/change-avatar/change-avatar.component.ts ***!
  \**********************************************************/
/*! exports provided: ChangeAvatarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeAvatarComponent", function() { return ChangeAvatarComponent; });
/* harmony import */ var _raw_loader_change_avatar_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./change-avatar.component.html */ "UGLl");
/* harmony import */ var _change_avatar_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./change-avatar.component.scss */ "busx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/auth.service */ "6uu6");
/* harmony import */ var _model_ChangeAvatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/ChangeAvatar */ "gwg2");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/token.service */ "/QNy");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChangeAvatarComponent = /** @class */ (function () {
    function ChangeAvatarComponent(authService, tokenService, router) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.router = router;
        this.form = {};
        this.error = {
            message: 'no'
        };
        this.success = {
            message: 'yes'
        };
        this.status = 'Please choose an image and click upload';
    }
    ChangeAvatarComponent.prototype.ngOnInit = function () {
    };
    ChangeAvatarComponent.prototype.onSubmit = function () {
        var _this = this;
        this.changeAvatar = new _model_ChangeAvatar__WEBPACK_IMPORTED_MODULE_4__["ChangeAvatar"](this.form.avatarUrl);
        this.authService.changeAvatar(this.changeAvatar).subscribe(function (data) {
            if (JSON.stringify(data) == JSON.stringify(_this.error)) {
                _this.status = 'Please upload Avatar!';
            }
            if (JSON.stringify(data) == JSON.stringify(_this.success)) {
                _this.status = "Change Avatar success!";
                _this.tokenService.setAvatarUrl(_this.form.avatar);
            }
        }, function (error) {
            alert('Change avatar Failed!');
        });
    };
    ChangeAvatarComponent.prototype.onUploadAvatar = function ($event) {
        this.form.avatarUrl = $event;
    };
    ChangeAvatarComponent.ctorParameters = function () { return [
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
    ]; };
    ChangeAvatarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-change-avatar',
            template: _raw_loader_change_avatar_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_change_avatar_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _service_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], ChangeAvatarComponent);
    return ChangeAvatarComponent;
}());



/***/ }),

/***/ "ovAZ":
/*!*******************************************************************!*\
  !*** ./src/app/form-login/user-account/user-account.component.ts ***!
  \*******************************************************************/
/*! exports provided: UserAccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAccountComponent", function() { return UserAccountComponent; });
/* harmony import */ var _raw_loader_user_account_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./user-account.component.html */ "48gU");
/* harmony import */ var _user_account_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-account.component.scss */ "wzwQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_token_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/token.service */ "/QNy");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _model_PostForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../model/PostForm */ "7Rwp");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/auth.service */ "6uu6");
/* harmony import */ var _service_friend_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/friend.service */ "rY/d");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserAccountComponent = /** @class */ (function () {
    function UserAccountComponent(tokenService, router, postService, friendService) {
        this.tokenService = tokenService;
        this.router = router;
        this.postService = postService;
        this.friendService = friendService;
        this.check = false;
        this.formComment = {};
        this.form = { status: 'public' };
        this.isCheckAdmin = false;
        this.admin = ['ADMIN'];
        this.listUser = [];
        this.listPost = [];
        this.arrImage = [];
        this.arrIConvert = [];
        this.myMap = new Map();
        this.isSearching = false;
    }
    UserAccountComponent.prototype.ngOnInit = function () {
        this.getListPost();
        this.fullName = this.tokenService.getFullName();
        this.phone = this.tokenService.getPhone();
        this.email = this.tokenService.getEmail();
        this.avatar = this.tokenService.getAvatarUrl();
        if (JSON.stringify(this.tokenService.getRole()) == JSON.stringify(this.admin)) {
            this.isCheckAdmin = true;
        }
        this.getMess();
    };
    UserAccountComponent.prototype.logOut = function () {
        window.sessionStorage.clear();
        this.router.navigate(['login']).then(function () {
        });
    };
    ;
    UserAccountComponent.prototype.displayNotification = function () {
        this.router.navigate(['notify']).then(function () { });
    };
    UserAccountComponent.prototype.getListPost = function () {
        var _this = this;
        this.postService.showListPost().subscribe(function (data) {
            _this.listPost = data;
            console.log('data --> ', data);
            for (var i = 0; i < data.length; i++) {
                _this.arrIConvert = [];
                _this.arrIConvert = data[i].imageUrl.split(',');
                _this.myMap.set(i, _this.arrIConvert);
            }
        });
    };
    UserAccountComponent.prototype.ngPost = function () {
        var _this = this;
        this.post = new _model_PostForm__WEBPACK_IMPORTED_MODULE_5__["PostForm"](this.form.content, this.form.status, this.form.imageUrl);
        this.postService.createPost(this.post).subscribe(function (data) {
            _this.form = {
                content: null,
                status: 'public',
                imageUrl: null
            };
            _this.arrImage = [];
            _this.getListPost();
        });
    };
    UserAccountComponent.prototype.addImage = function ($event) {
        this.arrImage.push($event);
        this.form.imageUrl = this.arrImage.toString();
    };
    UserAccountComponent.prototype.onChangeAvatar1 = function ($event) {
        this.avatar = $event;
    };
    UserAccountComponent.prototype.searchName = function (name) {
        var _this = this;
        this.friendService.searchByFullName(name).subscribe(function (data) {
            _this.listUser = data;
            _this.isSearching = true;
        });
    };
    UserAccountComponent.prototype.profile = function () {
        this.check = true;
    };
    UserAccountComponent.prototype.timeLine = function () {
        this.check = false;
    };
    UserAccountComponent.prototype.closeSearch = function () {
        this.isSearching = false;
    };
    UserAccountComponent.prototype.getMess = function () {
        var _this = this;
        this.postService.getMess().subscribe(function (data) {
            console.log(data, 'get mess');
            _this.chat = data;
        });
    };
    UserAccountComponent.prototype.saveImg = function (data) {
        window.sessionStorage.setItem('Img', data);
        this.router.navigate(['/chat']);
    };
    UserAccountComponent.ctorParameters = function () { return [
        { type: _service_token_service__WEBPACK_IMPORTED_MODULE_3__["TokenService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
        { type: _service_friend_service__WEBPACK_IMPORTED_MODULE_7__["FriendService"] }
    ]; };
    UserAccountComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-user-account',
            template: _raw_loader_user_account_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_user_account_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_token_service__WEBPACK_IMPORTED_MODULE_3__["TokenService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _service_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _service_friend_service__WEBPACK_IMPORTED_MODULE_7__["FriendService"]])
    ], UserAccountComponent);
    return UserAccountComponent;
}());



/***/ }),

/***/ "pPHB":
/*!**********************************************************!*\
  !*** ./src/app/notification/notification.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3RpZmljYXRpb24uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "q7ca":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/comment/comment.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"w3-container w3-padding\" xmlns=\"http://www.w3.org/1999/html\">\r\n    <form class=\"\" [formGroup]=\"commentForm\" (ngSubmit)=\"ngComment()\" novalidate>\r\n        <!-- CONTENT -->\r\n        <mat-form-field style=\"width: 80%\" appearance=\"outline\">\r\n            <input name=\"content\" formControlName=\"content\" matInput\r\n                   placeholder=\"Enter a comment...\">\r\n        </mat-form-field>\r\n        <button mat-stroked-button color=\"accent\" type=\"submit\"\r\n                class=\"mat-button-toggle-group btn-outline-primary\">&ensp;Comment\r\n        </button>\r\n    </form>\r\n</div>\r\n<div class=\"column\" *ngFor=\"let comments of post.commentList; index as i\">\r\n    <div class=\"card\">\r\n        <div><strong>{{comments.user.fullName}}</strong> : <span *ngIf=\"!comments.check\">{{comments.content}}</span>\r\n            <input nz-input style=\"width: 100%\" *ngIf=\"comments.check\" type=\"text\" [(ngModel)]=\"comments.content\"\r\n                   (keydown.enter)=\"submitComment(comments)\">\r\n        </div>\r\n        <button mat-button [matMenuTriggerFor]=\"menu2\">Menu</button>\r\n        <mat-menu #menu2=\"matMenu\">\r\n            <button (click)=\"editComment(comments)\" mat-menu-item>Edit</button>\r\n            <button (click)=\"deleteComment(comments, i)\" mat-menu-item>Delete</button>\r\n        </mat-menu>\r\n\r\n<!--        <button (click)=\"editComment(comments)\">sua cmt</button>-->\r\n<!--        <button (click)=\"deleteComment(comments, i)\">xóa comment</button>-->\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "rDm7":
/*!***********************************************************!*\
  !*** ./src/app/form-login/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _raw_loader_register_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./register.component.html */ "gX9c");
/* harmony import */ var _register_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.component.scss */ "PRPk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _model_SignUpForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../model/SignUpForm */ "WQSX");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../service/auth.service */ "6uu6");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.status = 'Please fill in the form to register!';
        this.form = {};
        this.hide = true;
        this.emailFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email
        ]);
        this.check_password = false;
        this.error1 = {
            message: "user_existed"
        };
        this.error2 = {
            message: "no_email"
        };
        this.success = {
            message: "create_success"
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.signUpForm = new _model_SignUpForm__WEBPACK_IMPORTED_MODULE_4__["SignUpForm"](this.form.fullName, this.form.username, this.form.password, this.form.re_password, this.form.email, this.form.phone, this.form.dateOfBirth);
        this.authService.signup(this.signUpForm).subscribe(function (data) {
            console.log('data == ', data);
            if (JSON.stringify(data) == JSON.stringify(_this.error1)) {
                _this.status = 'The username is existed! Please try again!';
            }
            if (JSON.stringify(data) == JSON.stringify(_this.error2)) {
                _this.status = 'The email is existed! Please try again!';
            }
            if (JSON.stringify(data) == JSON.stringify(_this.success)) {
                _this.status = 'Create account success!';
                _this.authService.setData(true);
                _this.router.navigate(['login']);
            }
        }, function (error) {
            alert('No Success');
        });
    };
    RegisterComponent.ctorParameters = function () { return [
        { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
    ]; };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-register',
            template: _raw_loader_register_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_register_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "rY/d":
/*!*******************************************!*\
  !*** ./src/app/service/friend.service.ts ***!
  \*******************************************/
/*! exports provided: FriendService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FriendService", function() { return FriendService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment.prod */ "cxbk");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FriendService = /** @class */ (function () {
    function FriendService(http) {
        this.http = http;
        this.API_FRIEND_SEARCH = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'findFriend';
        this.API_ADD_FRIEND = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'sendaddfriend';
        this.API_SET_FRIEND = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'setFriend';
        this.API_SHOW_ADD_FRIEND = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'showfriendadd';
        this.API_CONFIRM = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'confirmfriend';
        this.API_REFUSE = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'refuse';
        this.API_LIST_FRIEND = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'showfriend';
        this.API_DELETE_FRIEND = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'deleteFriend';
        this.API_FRIEND_REQUEST = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'showFriendRequest';
        this.API_DELETE_REQUEST = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].API_LOCAL + 'deleteRequest';
    }
    FriendService.prototype.searchByFullName = function (name) {
        return this.http.get(this.API_FRIEND_SEARCH + '/' + name);
    };
    FriendService.prototype.sendAddFriend = function (id) {
        return this.http.get(this.API_ADD_FRIEND + '/' + id);
    };
    FriendService.prototype.setFriend = function (id) {
        return this.http.get(this.API_SET_FRIEND + '/' + id);
    };
    FriendService.prototype.showAddFriend = function () {
        return this.http.get(this.API_SHOW_ADD_FRIEND);
    };
    FriendService.prototype.confirm = function (id) {
        return this.http.get(this.API_CONFIRM + '/' + id);
    };
    FriendService.prototype.refuse = function (id) {
        return this.http.delete(this.API_REFUSE + '/' + id);
    };
    FriendService.prototype.showListFriend = function () {
        return this.http.get(this.API_LIST_FRIEND);
    };
    FriendService.prototype.deleteFriend = function (id) {
        return this.http.delete(this.API_DELETE_FRIEND + '/' + id);
    };
    FriendService.prototype.showFriendRequest = function () {
        return this.http.get(this.API_FRIEND_REQUEST);
    };
    FriendService.prototype.deleteRequest = function (id) {
        return this.http.delete(this.API_DELETE_REQUEST + '/' + id);
    };
    FriendService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    FriendService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], FriendService);
    return FriendService;
}());



/***/ }),

/***/ "sEg8":
/*!**********************************************************************!*\
  !*** ./src/app/adminManage/admin-manager/admin-manager.component.ts ***!
  \**********************************************************************/
/*! exports provided: AdminManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminManagerComponent", function() { return AdminManagerComponent; });
/* harmony import */ var _raw_loader_admin_manager_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./admin-manager.component.html */ "SZ1T");
/* harmony import */ var _admin_manager_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-manager.component.scss */ "zyVp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/admin.service */ "KLmy");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminManagerComponent = /** @class */ (function () {
    function AdminManagerComponent(adminService) {
        this.adminService = adminService;
        this.totalElements = 0;
        this.users = [];
    }
    AdminManagerComponent.prototype.ngOnInit = function () {
        this.getListRequest({ page: 0, size: 3 });
    };
    AdminManagerComponent.prototype.getListRequest = function (request) {
        var _this = this;
        this.loading = true;
        this.adminService.pageUser(request).subscribe(function (data) {
            _this.users = data['content'];
            _this.totalElements = data['totalElements'];
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    AdminManagerComponent.prototype.nextPage = function (event) {
        var request = {};
        request['page'] = event.pageIndex.toString();
        request['size'] = event.pageSize.toString();
        this.getListRequest(request);
    };
    AdminManagerComponent.prototype.blockUser = function (index) {
        var _this = this;
        var user = this.users[index];
        this.adminService.changeRoleUser(user.id).subscribe(function (data) {
            _this.users[index].isActive = !_this.users[index].isActive;
        });
    };
    AdminManagerComponent.ctorParameters = function () { return [
        { type: _service_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"] }
    ]; };
    AdminManagerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-admin-manager',
            template: _raw_loader_admin_manager_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_admin_manager_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"]])
    ], AdminManagerComponent);
    return AdminManagerComponent;
}());



/***/ }),

/***/ "tUYy":
/*!************************************************!*\
  !*** ./src/app/comment/comment.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21tZW50LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "tq2C":
/*!********************************************!*\
  !*** ./src/app/search/search.component.ts ***!
  \********************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var _raw_loader_search_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./search.component.html */ "I/Hr");
/* harmony import */ var _search_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.component.scss */ "3BjR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/admin.service */ "KLmy");
/* harmony import */ var _service_friend_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/friend.service */ "rY/d");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchComponent = /** @class */ (function () {
    function SearchComponent(adminService, friendService) {
        this.adminService = adminService;
        this.friendService = friendService;
        this.users = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.getListRequest();
    };
    SearchComponent.prototype.getListRequest = function () {
        var _this = this;
        this.adminService.suggestions().subscribe(function (data) {
            _this.users = data;
        });
    };
    SearchComponent.prototype.addFriend = function (id, index) {
        var _this = this;
        this.friendService.sendAddFriend(id).subscribe(function (data) {
            var i = index;
            var a1 = _this.users.slice(0, i);
            var a2 = _this.users.slice(i + 1, _this.users.length);
            _this.users = a1.concat(a2).slice(0);
        });
    };
    SearchComponent.ctorParameters = function () { return [
        { type: _service_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"] },
        { type: _service_friend_service__WEBPACK_IMPORTED_MODULE_4__["FriendService"] }
    ]; };
    SearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-search',
            template: _raw_loader_search_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_search_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"],
            _service_friend_service__WEBPACK_IMPORTED_MODULE_4__["FriendService"]])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "wzwQ":
/*!*********************************************************************!*\
  !*** ./src/app/form-login/user-account/user-account.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".w3-container-left {\n  text-align: center;\n  margin-top: 1px;\n}\n\n.column {\n  float: left;\n  width: 33.3%;\n  padding: 10px 10px;\n}\n\n.card {\n  text-align: center;\n  background-color: #e8e5d7;\n}\n\ndiv.card {\n  padding: 2px;\n}\n\n.img {\n  width: auto;\n  height: 200px;\n  border-radius: 3%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFx1c2VyLWFjY291bnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFDQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFFRjs7QUFBQTtFQUVFLGtCQUFBO0VBQ0EseUJBQUE7QUFFRjs7QUFBQTtFQUNFLFlBQUE7QUFHRjs7QUFEQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFJRiIsImZpbGUiOiJ1c2VyLWFjY291bnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudzMtY29udGFpbmVyLWxlZnR7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDFweDtcclxufVxyXG4uY29sdW1uIHtcclxuICBmbG9hdDogbGVmdDtcclxuICB3aWR0aDogMzMuMyU7XHJcbiAgcGFkZGluZzogMTBweCAxMHB4O1xyXG59XHJcbi5jYXJkIHtcclxuICAvL2JveC1zaGFkb3c6IDEycHggMTJweCAycHggMXB4IHJnYmEoNjAsODQsMjU1LDAuOTQpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlNWQ3O1xyXG59XHJcbmRpdi5jYXJkIHtcclxuICBwYWRkaW5nOiAycHg7XHJcbn1cclxuLmltZyB7XHJcbiAgd2lkdGg6IGF1dG87XHJcbiAgaGVpZ2h0OiAyMDBweDtcclxuICBib3JkZXItcmFkaXVzOiAzJTtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "xwfu":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/profile/profile.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div *ngFor=\"let post of listPost, index as i\" class=\"w3-container w3-card w3-white w3-round w3-margin\"><br>\r\n    <button (click)=\"deletePosts(i,post.id)\">Click Tao</button>\r\n    <i nz-icon nzType=\"delete\" nzTheme=\"outline\"></i>\r\n    <nz-avatar class=\"w3-left w3-circle w3-margin-right\" [nzSize]=\"80\" nzIcon=\"user\"\r\n               nzSrc=\"{{post.user.avatarUrl}}\"></nz-avatar>\r\n    <h5 nz-typography>\r\n        {{post.user.fullName}}\r\n        <small nz-typography nzType=\"secondary\" class=\"w3-right w3-opacity\">{{post.created_date}}</small>\r\n    </h5>\r\n    <small nz-typography nzType=\"secondary\">{{post.status}}</small>\r\n    <hr class=\"w3-clear\">\r\n    <p>{{post.content}}</p>\r\n        <div class=\"row\">\r\n            <div class=\"column\" *ngFor=\"let img of myMap.get(i)\">\r\n                <div class=\"card\">\r\n                    <img style=\"height: 150px; width:auto\" class=\"img\" src=\"{{img}}\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    <app-like [post]=\"post\"></app-like>\r\n</div>\r\n");

/***/ }),

/***/ "y5RU":
/*!*************************************************************!*\
  !*** ./src/app/friend/list-friend/list-friend.component.ts ***!
  \*************************************************************/
/*! exports provided: ListFriendComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListFriendComponent", function() { return ListFriendComponent; });
/* harmony import */ var _raw_loader_list_friend_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./list-friend.component.html */ "bZIK");
/* harmony import */ var _list_friend_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-friend.component.scss */ "I11r");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_friend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/friend.service */ "rY/d");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListFriendComponent = /** @class */ (function () {
    function ListFriendComponent(friendService) {
        this.friendService = friendService;
        this.users = [];
    }
    ListFriendComponent.prototype.ngOnInit = function () {
        this.getListFriend();
    };
    ListFriendComponent.prototype.getListFriend = function () {
        var _this = this;
        this.friendService.showListFriend().subscribe(function (data) {
            _this.users = data;
        });
    };
    ListFriendComponent.prototype.deleteFriend = function (id) {
        var _this = this;
        this.friendService.deleteFriend(id).subscribe(function (data) {
            _this.getListFriend();
        });
    };
    ListFriendComponent.ctorParameters = function () { return [
        { type: _service_friend_service__WEBPACK_IMPORTED_MODULE_3__["FriendService"] }
    ]; };
    ListFriendComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-list-friend',
            template: _raw_loader_list_friend_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_list_friend_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_service_friend_service__WEBPACK_IMPORTED_MODULE_3__["FriendService"]])
    ], ListFriendComponent);
    return ListFriendComponent;
}());



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 2;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7QUFDRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtbmF2YmFyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgei1pbmRleDogMjtcclxufVxyXG5cclxuIl19 */");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "zyVp":
/*!************************************************************************!*\
  !*** ./src/app/adminManage/admin-manager/admin-manager.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1tYW5hZ2VyLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map