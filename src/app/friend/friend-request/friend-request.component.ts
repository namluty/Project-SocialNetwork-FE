import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit {
  users: User[] =[];
  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.getFriendRequest();
  }

  getFriendRequest(){
    this.friendService.showFriendRequest().subscribe(data =>{
      this.users =data;
    })
  }

  deleteRequest(id: number) {
    this.friendService.deleteRequest(id).subscribe(data =>{
      console.log(data, "friend bị thu hồi");
      this.getFriendRequest();
    })
  }
}
