import { AuthenticateUserInput } from '../types/input/use-cases/authenticate-user.input';
import { AuthenticateUserOutput } from '../types/output/use-cases/authenticate-user.output';

export abstract class AuthenticateUserUseCase {
  abstract execute(
    data: AuthenticateUserInput,
  ): Promise<AuthenticateUserOutput>;
}
