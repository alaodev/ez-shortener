import { Inject, UnauthorizedException } from '@nestjs/common';
import { AuthenticateUserInput } from '../../domain/types/input/use-cases/authenticate-user.input';
import { AuthenticateUserOutput } from '../../domain/types/output/use-cases/authenticate-user.output';
import { AuthenticateUserUseCase } from '../../domain/use-cases/authenticate-user.usecase';
import { FindUserByEmailUseCase } from '../../../users/domain/use-cases/find-user-by-email.usecase';
import { CompareService, SignService } from '../../domain/services';

export class AuthenticateUserUseCaseImpl implements AuthenticateUserUseCase {
  constructor(
    @Inject('FindUserByEmailUseCase')
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject('CompareService')
    private readonly compareService: CompareService,
    @Inject('SignService')
    private readonly signService: SignService,
  ) {}

  async execute(data: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const { email, password } = data;
    const foundUser = await this.findUserByEmailUseCase.execute(email);
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
