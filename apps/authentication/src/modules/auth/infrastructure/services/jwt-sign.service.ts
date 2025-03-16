import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignService } from '../../domain/services/sign.service';

@Injectable()
export class JwtSignService implements SignService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
