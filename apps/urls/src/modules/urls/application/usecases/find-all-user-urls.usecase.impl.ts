import { FindAllUserUrlsOutput } from '../../domain/types/output/usecases';
import { FindAllUserUrlsUseCase } from '../../domain/usecases';
import { FindAllUrlsByOwnerRepository } from '../../domain/repositories/find-all-urls-by-owner.repository';

export class FindAllUserUrlsUseCaseImpl implements FindAllUserUrlsUseCase {
  constructor(
    private readonly findAllUrlsByOwnerRepository: FindAllUrlsByOwnerRepository,
  ) {}

  async execute(userId: string): Promise<FindAllUserUrlsOutput> {
    return this.findAllUrlsByOwnerRepository.findAllUrlsByOwner(userId);
  }
}
