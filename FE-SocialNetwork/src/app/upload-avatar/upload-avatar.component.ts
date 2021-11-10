import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  listIMG: Array<string> = [];
  myMap = new Map();
  @Output()
  giveURLtoCreate = new EventEmitter<string>();

  constructor(private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  //Khi upload file qua thẻ input dưới dạng 1 hoặc nhiều file thì tệp đó thông qua sự kiện (change) $event được kích hoạt. Và tất cả file upload sẽ lưu trữ
  // trong $event.target.files.
  onFileChanged($event: Event) {
    const files: any = ($event.target as HTMLInputElement).files;
    if (files.length === 1) {
      // this.selectedFile = files[0];
      this.onUpload(files[0]);
    } else {
      for (const file of files) {
        this.onUpload(file);
      }
    }
  }

  onUpload(file?: File): void {
    this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2); //Tạo ra 1 name riêng cho mỗi DB firebase;
    this.ref = this.afStorage.ref(id);
    this.ref.put(file).then(snapshot => {
      return snapshot.ref.getDownloadURL(); //Tra ve 1 chuoi sieu van ban tren FB.
    }).then(downloadURL => { //chuyen giao link tu nhung component khac nhau khi su upload
      this.giveURLtoCreate.emit(downloadURL);
      this.checkUploadAvatar = false;
    })
      .catch(error => {
        console.log(`Failed to upload avatar and get link ${error}`);
      });
  }

}
