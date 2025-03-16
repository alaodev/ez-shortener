import { JwtService } from '@ez-shortener/auth-guard/nestjs-jwt';
import { Injectable } from '@nestjs/common';
import { SignService } from '../../domain/services/sign.service';

@Injectable()
export class JwtSignService implements SignService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
