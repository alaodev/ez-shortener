import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../../domain/types/inputs/use-cases/create-user.input';
import { User } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../domain/use-cases/create-user.usecase';
import { UserRepository } from '../../domain/repositories/user.repository';
import { EncryptionService } from '../../domain/services/encryption.service';
import { CreateUserOutput } from '../../domain/types/outputs/use-cases/create-user.output';

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('EncryptionService')
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    const { username, email, password } = createUserInput;
    const foundUser = await this.userRepository.findUserByEmail(email);
    if (foundUser) throw new ConflictException('email already in use');
    const encryptedPassword = await this.encryptionService.hash(password);
    const user = new User({ username, email, password: encryptedPassword });
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}
