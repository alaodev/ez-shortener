import { Inject } from '@nestjs/common';
import { FindUserByEmailOutput } from '../../domain/types/outputs/use-cases/find-user-by-email.output';
import { FindUserByEmailUseCase } from '../../domain/use-cases/find-user-by-email.usecase';
import { UserRepository } from '../../domain/repositories/user.repository';

export class FindUserByEmailUseCaseImpl implements FindUserByEmailUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<FindUserByEmailOutput | null> {
    return this.userRepository.findUserByEmail(email);
  }
}
