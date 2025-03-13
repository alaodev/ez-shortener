import { Request } from 'express';

export type AuthenticatedUser = {
  id: string;
  username: string;
};

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
