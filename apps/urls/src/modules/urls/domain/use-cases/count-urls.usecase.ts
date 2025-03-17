import { CountUrlsOutput } from '../types/output/use-cases/count-urls.output';

export abstract class CountUrlsUseCase {
  abstract execute(): Promise<CountUrlsOutput>;
}
