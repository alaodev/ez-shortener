import { CreateUserInput } from '../types/inputs/usecases/create-user.input';
import { CreateUserOutput } from '../types/outputs/usecases/create-user.output';

export abstract class CreateUserUseCase {
  abstract execute(data: CreateUserInput): Promise<CreateUserOutput>;
}
