import {User} from './User';
import {PostForm} from './PostForm';

export class Comments {
  id?: number;
  content: string;
  user?: User;
  post: PostForm;
  check?: boolean;


  constructor(content: string) {
    this.content = content;
    this.check = false;
  }


}
