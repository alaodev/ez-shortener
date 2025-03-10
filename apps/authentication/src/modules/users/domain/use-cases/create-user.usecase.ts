import { CreateUserInput } from '../types/inputs/use-cases/create-user.input';
import { CreateUserOutput } from '../types/outputs/use-cases/create-user.output';

export abstract class CreateUserUseCase {
  abstract execute(data: CreateUserInput): Promise<CreateUserOutput>;
}
