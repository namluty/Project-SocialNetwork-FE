import {Component, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss']
})
export class ProfileFriendComponent implements OnInit {
  constructor(private authService: AuthService,
              private post) { }

  ngOnInit(): void {
  }

}
