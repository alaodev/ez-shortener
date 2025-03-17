import { CountUrlsOutput } from '../../domain/types/output/use-cases/count-urls.output';
import { CountUrlsUseCase } from '../../domain/use-cases/count-urls.usecase';
import { CountUrlsRepository } from '../../domain/repositories/count-urls.repository';

export class CountUrlsUseCaseImpl implements CountUrlsUseCase {
  constructor(private readonly countUrlsRepository: CountUrlsRepository) {}

  async execute(): Promise<CountUrlsOutput> {
    return this.countUrlsRepository.countUrls();
  }
}
