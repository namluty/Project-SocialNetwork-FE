import { Component, OnInit } from '@angular/core';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
