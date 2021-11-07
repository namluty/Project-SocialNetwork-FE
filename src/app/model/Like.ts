import {User} from './User';
import {PostForm} from './PostForm';

export class Like{
  id?: number;
  user: User;
  posts: PostForm;
}
