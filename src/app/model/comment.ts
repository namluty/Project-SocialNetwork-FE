import {User} from './User';

export class Comments {
  id?: number;
  content: string;
  user?: User;
  check?: boolean;


  constructor(content: string) {
    this.content = content;
    this.check = false;
  }


}
