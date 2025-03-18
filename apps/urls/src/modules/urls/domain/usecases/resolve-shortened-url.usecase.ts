import { ResolveShortenedUrlOutput } from '../types/output/usecases/resolve-shortened-url.output';

export abstract class ResolveShortenedUrlUseCase {
  abstract execute(shortId: string): Promise<ResolveShortenedUrlOutput>;
}
