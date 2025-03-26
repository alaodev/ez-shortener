import { ZodValidationPipe } from '@ez-shortener/pipes';
import {
  RegisterUserRequestBody,
  AuthenticateUserRequestBody,
  registerUserRequestBodySchema,
  authenticateUserRequestBodySchema,
} from '@ez-shortener/contracts';
import { ExpressResponse } from '@ez-shortener/auth-guard';
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Response,
  UsePipes,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
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
    @Response({ passthrough: true }) response: ExpressResponse,
  ) {
    const env = this.configService.get<string>('ENVIRONMENT');
    const { accessToken } = await this.authenticateUserUseCase.execute(
      authenticateUserRequestBody,
    );
    console.log(env === 'production' || false, env);
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: env === 'production' || false,
    });
    response.send('successfully logged in');
  }
}
