import { CountUrlsOutput } from '../../domain/types/output/usecases/count-urls.output';
import { CountUrlsUseCase } from '../../domain/usecases/count-urls.usecase';
import { CountUrlsRepository } from '../../domain/repositories/count-urls.repository';

export class CountUrlsUseCaseImpl implements CountUrlsUseCase {
  constructor(private readonly countUrlsRepository: CountUrlsRepository) {}

  async execute(): Promise<CountUrlsOutput> {
    return this.countUrlsRepository.countUrls();
  }
}
