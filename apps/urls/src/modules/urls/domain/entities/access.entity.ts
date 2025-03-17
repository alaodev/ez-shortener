export class Access {
  public readonly id?: string;
  public address: string;
  public url: string;

  constructor({
    id,
    address,
    url,
  }: Partial<Access> & Pick<Access, 'address' | 'url'>) {
    this.id = id;
    this.address = address;
    this.url = url;
  }
}
