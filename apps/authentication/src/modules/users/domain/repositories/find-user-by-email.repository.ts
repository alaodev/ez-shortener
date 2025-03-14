import { FindUserByEmailRepositoryOutput } from '../types/outputs/repositories/find-user-by-email-repository.output';

export abstract class FindUserByEmailRepository {
  abstract findUserByEmail(
    email: string,
  ): Promise<FindUserByEmailRepositoryOutput | null>;
}
