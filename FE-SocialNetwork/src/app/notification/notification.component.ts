import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {Notification} from '../model/Notification';
import {PostForm} from '../model/PostForm';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] =[];
  post: PostForm;
  checkNotify= false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotification();
  }

  getNotification(){
    this.notificationService.getNotify().subscribe(data =>{
      this.notifications = data;
      console.log(data, 'notifications')
    })
  }

  getPostNotification(id: number) {
    this.notificationService.getPostNotification(id).subscribe(data =>{
      console.log(data, "post notification");
      this.checkNotify=true;
      this.post = data;
    })

  }

  check1() {
    this.checkNotify=false;
    this.getNotification();
  }
}
