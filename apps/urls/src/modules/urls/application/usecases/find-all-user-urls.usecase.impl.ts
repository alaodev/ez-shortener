import { FindAllUserUrlsOutput } from '../../domain/types/output/usecases';
import { FindAllUserUrlsUseCase } from '../../domain/usecases';
import { FindAllUrlsByOwnerRepository } from '../../domain/repositories/find-all-urls-by-owner.repository';

export class FindAllUserUrlsUseCaseImpl implements FindAllUserUrlsUseCase {
  constructor(
    private readonly findAllUrlsByOwnerRepository: FindAllUrlsByOwnerRepository,
  ) {}

  async execute(userId: string): Promise<FindAllUserUrlsOutput> {
    const foundUrls =
      await this.findAllUrlsByOwnerRepository.findAllUrlsByOwner(userId);
    return foundUrls.map((url) => ({
      id: url.id,
      originalUrl: url.originalUrl,
      shortId: url.shortId,
    }));
  }
}
