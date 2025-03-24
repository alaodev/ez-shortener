import {
  AuthenticatedRequest,
  ExpressRequest,
  JwtAuthGuard,
} from '@ez-shortener/auth-guard';
import { ShortenUrlContract, shortenUrlSchema } from '@ez-shortener/contracts';
import { ZodValidationPipe } from '@ez-shortener/pipes';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  DeleteUserUrlUseCase,
  FindAllUserUrlsUseCase,
  ResolveShortenedUrlUseCase,
  ShortenUserUrlUseCase,
  TrackUrlAccessUseCase,
} from '../../domain/usecases';

@Controller('urls')
export class UrlsController {
  constructor(
    @Inject('ResolveShortenedUrlUseCase')
    private readonly resolveShortenedUrlUseCase: ResolveShortenedUrlUseCase,
    @Inject('TrackUrlAccessUseCase')
    private readonly trackUrlAccessUseCase: TrackUrlAccessUseCase,
    @Inject('FindAllUserUrlsUseCase')
    private readonly findAllUsersUrlsUseCase: FindAllUserUrlsUseCase,
    @Inject('ShortenUserUrlUseCase')
    private readonly shortenUserUrlUseCase: ShortenUserUrlUseCase,
    @Inject('DeleteUserUrlUseCase')
    private readonly deleteUserUrlUseCase: DeleteUserUrlUseCase,
  ) {}

  @Get(':shordId')
  @HttpCode(200)
  async resolveShortenedUrl(
    @Req() req: ExpressRequest,
    @Param('shordId') shortId: string,
  ) {
    const { ip: address } = req;
    const shortUrlResolved =
      await this.resolveShortenedUrlUseCase.execute(shortId);
    await this.trackUrlAccessUseCase.execute({
      address: address || 'undefined',
      url: shortUrlResolved.id,
    });
    return shortUrlResolved;
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  findAllUserUrls(@Req() req: AuthenticatedRequest) {
    const { user } = req;
    return this.findAllUsersUrlsUseCase.execute(user.id);
  }

  @Post('shorten')
  @HttpCode(201)
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

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteUserUrl(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const { user } = req;
    return this.deleteUserUrlUseCase.execute({
      id: id,
      owner: user.id,
    });
  }
}
