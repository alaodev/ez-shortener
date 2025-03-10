import { RegisterUserInput } from '../types/input/use-cases/register-user.input';
import { RegisterUserOutput } from '../types/output/use-cases/register-user.output';

export abstract class RegisterUserUseCase {
  abstract execute(data: RegisterUserInput): Promise<RegisterUserOutput>;
}
