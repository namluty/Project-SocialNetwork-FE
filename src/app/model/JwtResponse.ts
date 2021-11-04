import {Roles} from './Roles';

export interface JwtResponse {
  token?: string;
  avatarUrl?: string;
  roles?: Roles[];
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
  isActive?: string;
  findFriend?: string;
}
