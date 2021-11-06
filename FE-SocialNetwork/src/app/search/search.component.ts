import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {PageEvent} from '@angular/material/paginator';
import {AdminService} from '../service/admin.service';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  totalElements: number = 0;
  constructor(private adminService: AdminService,
              private friendService: FriendService) {
  }

  ngOnInit(): void {
    this.getListRequest({page: 0, size: 5});
  }

  private getListRequest(request) {
    this.adminService.pageUser(request).subscribe(data => {
      this.users = data['content'];
      console.log(this.users,'wudgqydkjad');
      this.totalElements = data['totalElements'];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListRequest(request);
  }

  addFriend(id: number) {
    this.friendService.sendAddFriend(id).subscribe(data => {
      console.log(data, 'tra ve cai gi');
    });
  }
  // setFriend(id: number){
  // this.friendService.setFriend(id).subscribe(setf =>{
  //   console.log(setf, 'cai gi day');
  // })
  // }
}
