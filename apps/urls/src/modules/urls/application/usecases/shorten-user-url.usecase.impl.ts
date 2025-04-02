import { ConflictException } from '@nestjs/common';
import { GenerateIdentifierService } from '../../domain/services/ generate-identifier.service';
import { ShortenUserUrlUseCase } from '../../domain/usecases/shorten-user-url.usecase';
import {
  CreateUrlRepository,
  FindUrlByShortIdRepository,
} from '../../domain/repositories';
import { Url } from '../../domain/entities/url.entity';
import { ShortenUserUrlInput } from '../../domain/types/inputs/uscases/shorten-user-url.input';
import { ShortenUserUrlOutput } from '../../domain/types/output/usecases/shorten-user-url.output';

export class ShortenUserUrlUseCaseImpl implements ShortenUserUrlUseCase {
  constructor(
    private readonly generateIdentifierService: GenerateIdentifierService,
    private readonly findUrlByShortIdRepository: FindUrlByShortIdRepository,
    private readonly createUrlRepository: CreateUrlRepository,
  ) {}

  async execute(data: ShortenUserUrlInput): Promise<ShortenUserUrlOutput> {
    const shortId = this.generateIdentifierService.generate(8);
    const foundUrl =
      await this.findUrlByShortIdRepository.findUrlByShortId(shortId);
    if (foundUrl) new ConflictException('generated identifier already exists');
    const { originalUrl, owner } = data;
    const url = new Url({
      originalUrl,
      shortId,
      owner,
    });
    const createdUrl = await this.createUrlRepository.createUrl(url);
    return {
      id: createdUrl.id,
      originalUrl: createdUrl.originalUrl,
      shortId: createdUrl.shortId,
    };
  }
}
