import { ShortenUserUrlOutput } from '../types/output/use-cases/shorten-user-url.output';
import { ShortenUserUrlInput } from '../types/inputs/use-cases/shorten-user-url.input';

export abstract class ShortenUserUrlUseCase {
  abstract execute(data: ShortenUserUrlInput): Promise<ShortenUserUrlOutput>;
}
