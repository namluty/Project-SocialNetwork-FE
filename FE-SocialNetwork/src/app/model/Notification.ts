import {Comments} from './comment';
import {Like} from './Like';

export class Notification{
  id?: number;
  notify: string;
  like: Like;
  comment: Comments;
  postId?: number;
}
