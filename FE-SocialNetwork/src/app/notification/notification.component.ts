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
  visible = false;
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotification();
  }

  getNotification(){
    this.notificationService.getNotify().subscribe(data =>{
      this.notifications = data;

    })
  }

  getPostNotification(id: number) {
    this.notificationService.getPostNotification(id).subscribe(data =>{
      this.checkNotify=true;
      this.post = data;
    })
  }

  check1() {
    this.checkNotify=false;
    this.getNotification();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
