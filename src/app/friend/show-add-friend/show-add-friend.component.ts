import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../service/friend.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-show-add-friend',
  templateUrl: './show-add-friend.component.html',
  styleUrls: ['./show-add-friend.component.scss']
})
export class ShowAddFriendComponent implements OnInit {
  users: User[] = [];

  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.getListAddFriend();
  }

  getListAddFriend(){
    this.friendService.showAddFriend().subscribe(data =>{
      this.users = data;
    })
  }

  addFriend(id: number) {
    this.friendService.confirm(id).subscribe(data =>{
      console.log(data);
      this.getListAddFriend();
    })
  }

  refuse(id: number){
    this.friendService.refuse(id).subscribe(data =>{
      console.log(data, 'refuse')
      this.getListAddFriend();
    })
  }
}
