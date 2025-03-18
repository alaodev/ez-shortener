import { RegisterUserInput } from '../../domain/types/input/usecases/register-user.input';
import { RegisterUserOutput } from '../../domain/types/output/uscases/register-user.output';
import { RegisterUserUseCase } from '../../domain/usecases/register-user.usecase';
import { CreateUserUseCase } from '../../../users/domain/usecases/create-user.usecase';

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(data: RegisterUserInput): Promise<RegisterUserOutput> {
    return this.createUserUseCase.execute(data);
  }
}
