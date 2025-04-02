import { AuthenticatedRequest, JwtAuthGuard } from '@ez-shortener/auth-guard';
import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  FindAllUserAccessUseCase,
  FindAllUserUrlAccessUseCase,
} from '../../domain/usecases';

@Controller('access')
export class AccessController {
  constructor(
    @Inject('FindAllUserAccessUseCase')
    private readonly findAllUserAccessUseCase: FindAllUserAccessUseCase,
    @Inject('FindAllUserUrlAccessUseCase')
    private readonly findAllUserUrlAccessUseCase: FindAllUserUrlAccessUseCase,
  ) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  findAllUserAccess(@Req() req: AuthenticatedRequest) {
    const { user } = req;
    return this.findAllUserAccessUseCase.execute(user.id);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  findAllUserUrlAccess(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const { user } = req;
    return this.findAllUserUrlAccessUseCase.execute({
      userId: user.id,
      urlId: id,
    });
  }
}
