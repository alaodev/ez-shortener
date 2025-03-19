import { Provider } from '@nestjs/common';
import {
  CreateUserUseCase,
  FindUserByEmailUseCase,
} from '../../../users/domain/usecases';
import { CompareService, SignService } from '../../domain/services';
import {
  AuthenticateUserUseCaseImpl,
  RegisterUserUseCaseImpl,
} from '../../application/usecases';

export const usecaseProviders: Provider[] = [
  {
    provide: 'AuthenticateUserUseCase',
    useFactory: (
      findUserByEmailUseCase: FindUserByEmailUseCase,
      compareService: CompareService,
      signService: SignService,
    ) => {
      return new AuthenticateUserUseCaseImpl(
        findUserByEmailUseCase,
        compareService,
        signService,
      );
    },
    inject: ['FindUserByEmailUseCase', 'CompareService', 'SignService'],
  },
  {
    provide: 'RegisterUserUseCase',
    useFactory: (createUserUseCase: CreateUserUseCase) => {
      return new RegisterUserUseCaseImpl(createUserUseCase);
    },
    inject: ['CreateUserUseCase'],
  },
];
