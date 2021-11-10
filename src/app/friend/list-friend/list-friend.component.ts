import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss']
})
export class ListFriendComponent implements OnInit {
  users: User[] =[];

  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.getListFriend();
  }

  getListFriend(){
    this.friendService.showListFriend().subscribe(data =>{
      this.users = data;
    })
  }

  deleteFriend(id: number) {
    this.friendService.deleteFriend(id).subscribe(data =>{
      this.getListFriend();
    })
    
  }
}
