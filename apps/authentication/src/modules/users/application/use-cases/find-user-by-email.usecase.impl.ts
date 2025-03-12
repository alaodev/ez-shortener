import { Inject } from '@nestjs/common';
import { FindUserByEmailOutput } from '../../domain/types/outputs/use-cases/find-user-by-email.output';
import { FindUserByEmailUseCase } from '../../domain/use-cases/find-user-by-email.usecase';
import { FindUserByEmailRepository } from '../../domain/repositories/find-user-by-email.repository';

export class FindUserByEmailUseCaseImpl implements FindUserByEmailUseCase {
  constructor(
    @Inject('FindUserByEmailRepository')
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<FindUserByEmailOutput | null> {
    return this.findUserByEmailRepository.findUserByEmail(email);
  }
}
