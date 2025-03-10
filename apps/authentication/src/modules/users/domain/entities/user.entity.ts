export class User {
  public readonly id?: string;
  public username: string;
  public email: string;
  public password: string;

  constructor({
    id,
    username,
    email,
    password,
  }: Partial<User> & Pick<User, 'username' | 'email' | 'password'>) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
