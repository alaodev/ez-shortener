import { User } from '../entities/user.entity';
import {
  CreateUserRepositoryOutput,
  FindUserByEmailRepositoryOutput,
} from '../types/outputs/repositories/user-repository.output';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<CreateUserRepositoryOutput>;
  abstract findUserByEmail(
    email: string,
  ): Promise<FindUserByEmailRepositoryOutput | null>;
}
