import {Component, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../model/User';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss']
})
export class ListFriendComponent implements OnInit {
  users: User[] = [];

  constructor(private friendService: FriendService,
              private router: Router) { }

  ngOnInit(): void {
    this.getListFriend();
  }

  getListFriend(){
    this.friendService.showListFriend().subscribe(data => {
      this.users = data;
      console.log(data, 'list friend');
    });
  }

  deleteFriend(id: number) {
    this.friendService.deleteFriend(id).subscribe(data => {
      console.log(data, 'delete friend');
      this.getListFriend();
    });
  }

  showProfileFriend(id: number){
    this.router.navigate(['profile-friend']);
  }
}
