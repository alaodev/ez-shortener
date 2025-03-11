import { Inject } from '@nestjs/common';
import { RegisterUserInput } from '../../domain/types/input/use-cases/register-user.input';
import { RegisterUserOutput } from '../../domain/types/output/use-cases/register-user.output';
import { RegisterUserUseCase } from '../../domain/use-cases/register-user.usecase';
import { CreateUserUseCase } from '../../../users/domain/use-cases/create-user.usecase';

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(data: RegisterUserInput): Promise<RegisterUserOutput> {
    return this.createUserUseCase.execute(data);
  }
}
