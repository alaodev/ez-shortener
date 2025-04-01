import { UnauthorizedException } from '@nestjs/common';
import { AuthenticateUserInput } from '../../domain/types/input/usecases/authenticate-user.input';
import { AuthenticateUserOutput } from '../../domain/types/output/uscases/authenticate-user.output';
import { AuthenticateUserUseCase } from '../../domain/usecases/authenticate-user.usecase';
import { FindUserByEmailRepository } from '../../../users/domain/repositories/find-user-by-email.repository';
import { CompareService, SignService } from '../../domain/services';

export class AuthenticateUserUseCaseImpl implements AuthenticateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly compareService: CompareService,
    private readonly signService: SignService,
  ) {}

  async execute(data: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const { email, password } = data;
    const foundUser =
      await this.findUserByEmailRepository.findUserByEmail(email);
    if (!foundUser)
      throw new UnauthorizedException('invalid email or password');
    const { id, username, password: encryptedPassword } = foundUser;
    const passwordsMatch = await this.compareService.compare(
      password,
      encryptedPassword,
    );
    if (!passwordsMatch)
      throw new UnauthorizedException('invalid email or password');
    const payload = { id, username };
    return {
      accessToken: await this.signService.sign(payload),
    };
  }
}
