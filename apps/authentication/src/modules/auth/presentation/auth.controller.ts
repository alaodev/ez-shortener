import { ZodValidationPipe } from '@ez-shortener/pipes';
import {
  RegisterUserContract,
  AuthenticateUserContract,
  registerUserSchema,
  authenticateUserSchema,
} from '@ez-shortener/contracts';
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  AuthenticateUserUseCase,
  RegisterUserUseCase,
} from '../domain/usecases';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('RegisterUserUseCase')
    private readonly registerUserUseCase: RegisterUserUseCase,
    @Inject('AuthenticateUserUseCase')
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('signup')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserSchema))
  async registerUser(@Body() registerUserContract: RegisterUserContract) {
    return this.registerUserUseCase.execute(registerUserContract);
  }

  @Post('signin')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateUserSchema))
  async authenticateUser(
    @Body() authenticateUserContract: AuthenticateUserContract,
  ) {
    return this.authenticateUserUseCase.execute(authenticateUserContract);
  }
}
