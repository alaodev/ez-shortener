export class Access {
  public readonly id?: string;
  public address: string;
  public browserName?: string;
  public browserVersion?: string;
  public osName?: string;
  public osVersion?: string;
  public url: string;
  public owner: string;

  constructor({
    id,
    address,
    browserName,
    browserVersion,
    osName,
    osVersion,
    url,
    owner,
  }: Partial<Access> & Pick<Access, 'address' | 'url' | 'owner'>) {
    this.id = id;
    this.address = address;
    this.browserName = browserName;
    this.browserVersion = browserVersion;
    this.osName = osName;
    this.osVersion = osVersion;
    this.url = url;
    this.owner = owner;
  }
}
