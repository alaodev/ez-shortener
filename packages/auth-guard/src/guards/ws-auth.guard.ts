import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { parse as cookieParse } from 'cookie';
import type { AuthenticatedClient, AuthenticatedUser } from '../types';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient<AuthenticatedClient>();
    const cookieHeader = client.handshake?.headers?.cookie;
    if (!cookieHeader) throw new WsException('cookie not provided');
    const cookies = cookieParse(cookieHeader);
    const token = cookies['access_token'];
    if (!token) throw new WsException('access token not provided');
    try {
      const decoded: AuthenticatedUser = this.jwtService.verify(token);
      client.user = decoded;
      return true;
    } catch {
      throw new WsException('invalid access token');
    }
  }
}
