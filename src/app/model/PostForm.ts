import {User} from './User';

export class PostForm {
  public content: string;
  public status: string;
  public imageUrl: string;
  public created_date: any;
  public modified_date: any;
  public user: User;
  public comments : Comment[];

  constructor(content: string, status: string, imageUrl: string) {
    this.content = content;
    this.status = status;
    this.imageUrl = imageUrl;
  }
}
