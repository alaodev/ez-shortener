import { ShortenUserUrlOutput } from '../types/output/usecases/shorten-user-url.output';
import { ShortenUserUrlInput } from '../types/inputs/uscases/shorten-user-url.input';

export abstract class ShortenUserUrlUseCase {
  abstract execute(data: ShortenUserUrlInput): Promise<ShortenUserUrlOutput>;
}
