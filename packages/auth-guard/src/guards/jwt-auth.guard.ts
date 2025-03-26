import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import {
  AuthenticatedRequest,
  AuthenticatedUser,
} from '../types/authenticated-request';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.cookies?.['access_token'];
    if (!token) throw new UnauthorizedException('access token not provided');
    try {
      const decoded: AuthenticatedUser = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('invalid access token');
    }
  }
}
