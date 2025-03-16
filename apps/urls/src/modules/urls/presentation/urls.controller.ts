import { AuthenticatedRequest, JwtAuthGuard } from '@ez-shortener/auth-guard';
import { ShortenUrlContract, shortenUrlSchema } from '@ez-shortener/contracts';
import { ZodValidationPipe } from '@ez-shortener/pipes';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  FindAllUserUrlsUseCase,
  ResolveShortenedUrlUseCase,
  ShortenUserUrlUseCase,
} from '../domain/use-cases';

@Controller('urls')
export class UrlsController {
  constructor(
    @Inject('ResolveShortenedUrlUseCase')
    private readonly resolveShortenedUrlUseCase: ResolveShortenedUrlUseCase,
    @Inject('FindAllUserUrlsUseCase')
    private readonly findAllUsersUrlsUseCase: FindAllUserUrlsUseCase,
    @Inject('ShortenUserUrlUseCase')
    private readonly shortenUserUrlUseCase: ShortenUserUrlUseCase,
  ) {}

  @Get(':shordId')
  resolveShortenedUrl(@Param('shordId') shortId: string) {
    return this.resolveShortenedUrlUseCase.execute(shortId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUserUrls(@Req() req: AuthenticatedRequest) {
    const { user } = req;
    return this.findAllUsersUrlsUseCase.execute(user.id);
  }

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
