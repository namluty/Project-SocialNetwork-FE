import { Component, OnInit } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {AuthService} from '../service/auth.service';
import {TokenService} from '../service/token.service';
import {Chat} from '../model/Chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  title = 'Meta chat';
  description = 'chat serve';
  message: string = '';
  img = 1;
  greetings: string[] = [];
  disabled = true;
  name = this.tokenService.getFullName();
  count: any;
  chats: Chat[]=[];

  private stompClient: any;

  constructor(private tokenService: TokenService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.connect();
    this.showMess(this.count = window.sessionStorage.getItem('Img'));
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    // đường dẫn đến server
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      // là chờ xem server gửi về.
      _this.stompClient.subscribe('/topic/public', function (hello: any) {
        _this.showGreeting(JSON.parse(hello.body).greeting);

      });

    });
  }

  // disconnect() {
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }
  //   this.setConnected(false);
  //   console.log('Disconnected!');
  // }

  sendName() {
    this.stompClient.send(
      '/gkz/hello',
      {},

      // Dữ liệu được gửi đi
      JSON.stringify({'name': this.name,  'message': this.message, 'img': this.img++})
    );
  }


  showGreeting(message: any) {
    this.greetings.unshift(message);
  }

  showMess(count: any){
    this.authService.showMessage(count).subscribe(data => {
      console.log(data, 'show mess');
      this.chats = data;
    });
  }
}
