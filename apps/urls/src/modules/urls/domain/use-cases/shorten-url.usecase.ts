export abstract class ShortenUrlUseCase {
  abstract execute(originalUrl: string): Promise<string>;
}
