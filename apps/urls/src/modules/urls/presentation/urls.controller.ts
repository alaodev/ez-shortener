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
import { ShortenUrlUseCase } from '../domain/use-cases/shorten-url.usecase';

@Controller('urls')
export class UrlsController {
  constructor(
    @Inject('ShortenUrlUseCase')
    private readonly shortenUrlUseCase: ShortenUrlUseCase,
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
    return this.shortenUrlUseCase.execute({
      originalUrl: originalUrl,
      owner: user.id,
    });
  }
}
