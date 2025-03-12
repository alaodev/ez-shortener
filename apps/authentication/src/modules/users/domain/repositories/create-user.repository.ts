import { User } from '../entities/user.entity';
import { CreateUserRepositoryOutput } from '../types/outputs/repositories/user-repository.output';

export abstract class CreateUserRepository {
  abstract createUser(user: User): Promise<CreateUserRepositoryOutput>;
}
