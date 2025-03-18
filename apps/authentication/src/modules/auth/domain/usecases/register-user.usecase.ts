import { RegisterUserInput } from '../types/input/usecases/register-user.input';
import { RegisterUserOutput } from '../types/output/uscases/register-user.output';

export abstract class RegisterUserUseCase {
  abstract execute(data: RegisterUserInput): Promise<RegisterUserOutput>;
}
