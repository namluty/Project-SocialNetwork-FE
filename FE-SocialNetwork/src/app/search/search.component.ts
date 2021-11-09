import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {AdminService} from '../service/admin.service';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users: User[] = [];

  constructor(private adminService: AdminService,
              private friendService: FriendService) {
  }

  ngOnInit(): void {
    this.getListRequest();
  }

  private getListRequest() {
    this.adminService.suggestions().subscribe(data => {
      this.users = data;
    });
  }

  addFriend(id: number, index: number) {
    this.friendService.sendAddFriend(id).subscribe(data => {
      const i = index;
      const a1 = this.users.slice(0, i);
      const a2 = this.users.slice(i + 1, this.users.length);
      [...this.users] = a1.concat(a2);
    });
  }
}
