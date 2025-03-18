import { CountUrlsOutput } from '../types/output/usecases/count-urls.output';

export abstract class CountUrlsUseCase {
  abstract execute(): Promise<CountUrlsOutput>;
}
