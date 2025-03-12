import { FindUserByEmailRepositoryOutput } from '../types/outputs/repositories/user-repository.output';

export abstract class FindUserByEmailRepository {
  abstract findUserByEmail(
    email: string,
  ): Promise<FindUserByEmailRepositoryOutput | null>;
}
