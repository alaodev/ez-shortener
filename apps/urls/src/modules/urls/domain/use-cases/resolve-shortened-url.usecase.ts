import { ResolveShortenedUrlOutput } from '../types/output/use-cases/resolve-shortened-url.output';

export abstract class ResolveShortenedUrlUseCase {
  abstract execute(shortId: string): Promise<ResolveShortenedUrlOutput>;
}
