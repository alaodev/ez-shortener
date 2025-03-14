import { AuthenticatedRequest, JwtAuthGuard } from '@ez-shortener/auth-guard';
import { ShortenUrlContract, shortenUrlSchema } from '@ez-shortener/contracts';
import { ZodValidationPipe } from '@ez-shortener/pipes';
import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ShortenUserUrlUseCase } from '../domain/use-cases/shorten-user-url.usecase';

@Controller('urls')
export class UrlsController {
  constructor(
    @Inject('ShortenUserUrlUseCase')
    private readonly shortenUserUrlUseCase: ShortenUserUrlUseCase,
  ) {}

  @Post('shorten')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(shortenUrlSchema))
  shortenUrl(
    @Req() req: AuthenticatedRequest,
    @Body() shortenUrlContract: ShortenUrlContract,
  ) {
    const { originalUrl } = shortenUrlContract;
    const { user } = req;
    return this.shortenUserUrlUseCase.execute({
      originalUrl: originalUrl,
      owner: user.id,
    });
  }
}
