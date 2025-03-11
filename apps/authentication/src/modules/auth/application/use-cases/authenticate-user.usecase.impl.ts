import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserInput } from '../../domain/types/input/use-cases/authenticate-user.input';
import { AuthenticateUserOutput } from '../../domain/types/output/use-cases/authenticate-user.output';
import { AuthenticateUserUseCase } from '../../domain/use-cases/authenticate-user.usecase';
import { FindUserByEmailUseCase } from '../../../users/domain/use-cases/find-user-by-email.usecase';
import { EncryptionService } from '../../../../common/domain/services/encryption.service';

export class AuthenticateUserUseCaseImpl implements AuthenticateUserUseCase {
  constructor(
    @Inject('FindUserByEmailUseCase')
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject('EncryptionService')
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const { email, password } = data;
    const foundUser = await this.findUserByEmailUseCase.execute(email);
    if (!foundUser)
      throw new UnauthorizedException('invalid email or password');
    const { id, username, password: encryptedPassword } = foundUser;
    const passwordsMatch = await this.encryptionService.compare(
      password,
      encryptedPassword,
    );
    if (!passwordsMatch)
      throw new UnauthorizedException('invalid email or password');
    const payload = { id, username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
