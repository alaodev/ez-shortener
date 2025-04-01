import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '../../../users/domain/usecases/create-user.usecase';
import { FindUserByEmailRepository } from '../../../users/domain/repositories/find-user-by-email.repository';
import { CompareService, SignService } from '../../domain/services';
import {
  AuthenticateUserUseCaseImpl,
  RegisterUserUseCaseImpl,
} from '../../application/usecases';

export const usecaseProviders: Provider[] = [
  {
    provide: 'AuthenticateUserUseCase',
    useFactory: (
      findUserByEmailRepository: FindUserByEmailRepository,
      compareService: CompareService,
      signService: SignService,
    ) => {
      return new AuthenticateUserUseCaseImpl(
        findUserByEmailRepository,
        compareService,
        signService,
      );
    },
    inject: ['FindUserByEmailRepository', 'CompareService', 'SignService'],
  },
  {
    provide: 'RegisterUserUseCase',
    useFactory: (createUserUseCase: CreateUserUseCase) => {
      return new RegisterUserUseCaseImpl(createUserUseCase);
    },
    inject: ['CreateUserUseCase'],
  },
];
