export class Url {
  public readonly id?: string;
  public originalUrl: string;
  public shortUrl: string;

  constructor({
    id,
    originalUrl,
    shortUrl,
  }: Partial<Url> & Pick<Url, 'originalUrl' | 'shortUrl'>) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
  }
}
