export class Access {
  public readonly id?: string;
  public address: string;
  public owner: string;

  constructor({
    id,
    address,
    owner,
  }: Partial<Access> & Pick<Access, 'address' | 'owner'>) {
    this.id = id;
    this.address = address;
    this.owner = owner;
  }
}
