import { Inject } from '@nestjs/common';
import { FindAllUserUrlsOutput } from '../../domain/types/output/use-cases';
import { FindAllUserUrlsUseCase } from '../../domain/use-cases';
import { FindAllUrlsByOwnerRepository } from '../../domain/repositories/find-all-urls-by-owner.repository';

export class FindAllUserUrlsUseCaseImpl implements FindAllUserUrlsUseCase {
  constructor(
    @Inject('FindAllUrlsByOwnerRepository')
    private readonly findAllUrlsByOwnerRepository: FindAllUrlsByOwnerRepository,
  ) {}

  async execute(userId: string): Promise<FindAllUserUrlsOutput[]> {
    return this.findAllUrlsByOwnerRepository.findAllUrlsByOwner(userId);
  }
}
