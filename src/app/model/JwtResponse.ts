import {Roles} from './roles';

export interface JwtResponse {
  token?: string;
  avatar?: string;
  roles?: Roles[];
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}
