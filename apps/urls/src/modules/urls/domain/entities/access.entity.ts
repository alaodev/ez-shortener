export class Access {
  public readonly id?: string;
  public address: string;
  public browserName?: string;
  public browserVersion?: string;
  public osName?: string;
  public osVersion?: string;
  public url: string;

  constructor({
    id,
    address,
    browserName,
    browserVersion,
    osName,
    osVersion,
    url,
  }: Partial<Access> & Pick<Access, 'address' | 'url'>) {
    this.id = id;
    this.address = address;
    this.browserName = browserName;
    this.browserVersion = browserVersion;
    this.osName = osName;
    this.osVersion = osVersion;
    this.url = url;
  }
}
