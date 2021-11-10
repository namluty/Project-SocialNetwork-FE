import {User} from './User';
import {Comments} from './comment';
import {Like} from './Like';


export class PostForm {
  public id ?: number;
  public content: string;
  public status: string;
  public imageUrl: string;
  public created_date: any;
  public modified_date: any;
  public user: User;
  public commentList : Comments[];
  public likeList: Like[]

  constructor(content: string, status: string, imageUrl: string) {
    this.content = content;
    this.status = status;
    this.imageUrl = imageUrl;
  }
}
