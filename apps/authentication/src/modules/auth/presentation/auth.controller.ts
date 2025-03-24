import { ZodValidationPipe } from '@ez-shortener/pipes';
import {
  RegisterUserRequestBody,
  AuthenticateUserRequestBody,
  registerUserRequestBodySchema,
  authenticateUserRequestBodySchema,
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
  @UsePipes(new ZodValidationPipe(registerUserRequestBodySchema))
  async registerUser(@Body() registerUserRequestBody: RegisterUserRequestBody) {
    return this.registerUserUseCase.execute(registerUserRequestBody);
  }

  @Post('signin')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateUserRequestBodySchema))
  async authenticateUser(
    @Body() authenticateUserRequestBody: AuthenticateUserRequestBody,
  ) {
    return this.authenticateUserUseCase.execute(authenticateUserRequestBody);
  }
}
