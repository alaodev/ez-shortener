export class Url {
  public readonly id?: string;
  public originalUrl: string;
  public shortId: string;
  public owner: string;

  constructor({
    id,
    originalUrl,
    shortId,
    owner,
  }: Partial<Url> & Pick<Url, 'originalUrl' | 'shortId' | 'owner'>) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortId = shortId;
    this.owner = owner;
  }
}
