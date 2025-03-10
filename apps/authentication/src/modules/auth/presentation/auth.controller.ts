import { ZodValidationPipe } from '@ez-shortener/pipes';
import {
  RegisterUserContract,
  registerUserSchema,
} from '@ez-shortener/contracts';
import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { RegisterUserUseCase } from '../domain/use-cases/register-user.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('RegisterUserUseCase')
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(registerUserSchema))
  async registerUser(@Body() registerUserContract: RegisterUserContract) {
    return this.registerUserUseCase.execute(registerUserContract);
  }
}
