import { AuthenticateUserInput } from '../types/input/usecases/authenticate-user.input';
import { AuthenticateUserOutput } from '../types/output/uscases/authenticate-user.output';

export abstract class AuthenticateUserUseCase {
  abstract execute(
    data: AuthenticateUserInput,
  ): Promise<AuthenticateUserOutput>;
}
