import { Component, OnInit } from '@angular/core';
import {AdminService} from '../service/admin.service';
import {User} from '../model/user';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent implements OnInit {
   totalElements : number =0;
   users : User[] = [];
   loading : boolean;

  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    this.getListRequest({page:0, size:3})
  }

  private getListRequest(request) {
    this.loading = true;
    this.adminService.pageUser(request).subscribe(data => {
      console.log('data --> ', data);
      this.users = data['content'];
      console.log('data[content] ---->', data['content']);
      this.totalElements = data['totalElements'];
      console.log('data[totalElements] == ', data['totalElements']);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  nextPage(event: PageEvent) {
    console.log('event -->', event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    console.log('request[size]', request['size']);
    this.getListRequest(request);
  }

  blockUser(id: number){
    console.log('id == ', id);
    this.adminService.changeRoleUser(id).subscribe(date =>{
      console.log('data => ',date)
    })
  }

  // deleteUser(id: number) {
  //   this.adminService.deleteUserById(id).subscribe(data =>{
  //     if(JSON.stringify(data)==JSON.stringify(this.deleteSuccess)){
  //       this.checkDelete = true;
  //       this.status = 'Delete success!';
  //       // window.location.reload(); //Cach 1 : Dung Reload trang
  //       const request =  {page: 0, size: 90} //Cach 2: Cap nhat lai list sau khi xoa khong reload.
  //       this.getListRequest(request);
  //     }
  //   })
  // }
  // openDialog(id){
  //   console.log('goi openDialog');
  //   const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);
  //   console.log('dialogRef === ', dialogRef);
  //   dialogRef.afterClosed().subscribe(result =>{
  //     console.log('result === ', result);
  //     if(result){
  //       console.log('id ==== ', id);
  //       this.deleteUser(id);
  //     }
  //     console.log(`Dialog result ==>: ${result}`);
  //   })
  // }

}
