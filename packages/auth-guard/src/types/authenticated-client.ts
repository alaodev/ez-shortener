import { Socket } from 'socket.io';
import type { AuthenticatedUser } from './authenticated-user';

export interface AuthenticatedClient extends Socket {
  user: AuthenticatedUser;
}
