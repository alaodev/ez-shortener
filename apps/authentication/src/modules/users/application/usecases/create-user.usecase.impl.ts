import { ConflictException } from '@nestjs/common';
import { CreateUserInput } from '../../domain/types/inputs/usecases/create-user.input';
import { User } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../domain/usecases/create-user.usecase';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
} from '../../domain/repositories';
import { CreateUserOutput } from '../../domain/types/outputs/usecases/create-user.output';
import { HashingService } from '../../domain/services/hashing.service';

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    const { username, email, password } = createUserInput;
    const foundUser =
      await this.findUserByEmailRepository.findUserByEmail(email);
    if (foundUser) throw new ConflictException('email already in use');
    const encryptedPassword = await this.hashingService.hash(password);
    const user = new User({ username, email, password: encryptedPassword });
    const createdUser = await this.createUserRepository.createUser(user);
    return createdUser;
  }
}
