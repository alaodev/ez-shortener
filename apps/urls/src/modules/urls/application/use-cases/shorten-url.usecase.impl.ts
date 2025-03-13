import { ConflictException, Inject } from '@nestjs/common';
import { GenerateIdentifierService } from '../../domain/services/ generate-identifier.service';
import { ShortenUrlUseCase } from '../../domain/use-cases/shorten-url.usecase';
import {
  CreateUrlRepository,
  FindUrlByShortIdRepository,
} from '../../domain/repositories';
import { Url } from '../../domain/entities/url.entity';
import { ShortenUrlInput } from '../../domain/types/inputs/use-cases/shorten-url.input';
import { ShortenUrlOutput } from '../../domain/types/output/use-cases/shorten-url.output';

export class ShortenUrlUseCaseImpl implements ShortenUrlUseCase {
  constructor(
    @Inject('GenerateIdentifierService')
    private readonly generateIdentifierService: GenerateIdentifierService,
    @Inject('FindUrlByShortIdRepository')
    private readonly findUrlByShortIdRepository: FindUrlByShortIdRepository,
    @Inject('CreateUrlRepository')
    private readonly createUrlRepository: CreateUrlRepository,
  ) {}

  async execute(data: ShortenUrlInput): Promise<ShortenUrlOutput> {
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
    return createdUrl;
  }
}
