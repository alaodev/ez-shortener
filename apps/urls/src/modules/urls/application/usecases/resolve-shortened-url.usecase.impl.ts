import { NotFoundException } from '@nestjs/common';
import { FindUrlByShortIdRepository } from '../../domain/repositories/find-url-by-short-id.repository';
import { ResolveShortenedUrlOutput } from '../../domain/types/output/usecases';
import { ResolveShortenedUrlUseCase } from '../../domain/usecases/resolve-shortened-url.usecase';

export class ResolveShortenedUrlUseCaseImpl
  implements ResolveShortenedUrlUseCase
{
  constructor(
    private readonly findUrlByShortIdRepository: FindUrlByShortIdRepository,
  ) {}

  async execute(shortId: string): Promise<ResolveShortenedUrlOutput> {
    const foundUrl =
      await this.findUrlByShortIdRepository.findUrlByShortId(shortId);
    if (!foundUrl) throw new NotFoundException('url not found');
    return {
      id: foundUrl.id,
      originalUrl: foundUrl.originalUrl,
      owner: foundUrl.owner,
    };
  }
}
