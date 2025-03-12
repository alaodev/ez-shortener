import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../../domain/types/inputs/use-cases/create-user.input';
import { User } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../domain/use-cases/create-user.usecase';
import { FindUserByEmailRepository } from '../../domain/repositories/find-user-by-email.repository';
import { CreateUserRepository } from '../../domain/repositories/create-user.repository';
import { CreateUserOutput } from '../../domain/types/outputs/use-cases/create-user.output';
import { HashingService } from '../../../../common/domain/services/hashing.service';

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    @Inject('FindUserByEmailRepository')
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
    @Inject('HashingService')
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
