import { ShortenUrlOutput } from '../types/output/use-cases/shorten-url.output';
import { ShortenUrlInput } from '../types/inputs/use-cases/shorten-url.input';

export abstract class ShortenUrlUseCase {
  abstract execute(data: ShortenUrlInput): Promise<ShortenUrlOutput>;
}
