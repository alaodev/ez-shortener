import { CountUrlsRepositoryOutput } from '../types/output/repositories/count-urls-repository.output';

export abstract class CountUrlsRepository {
  abstract countUrls(): Promise<CountUrlsRepositoryOutput>;
}
