import type { User } from './user.interface';

export interface IAuthResponse {
  user: User;
  token: string;
}

export interface ILoginResponse {
  ok: boolean;
  user?: User;
  token?: string;
  message?: string;
}
