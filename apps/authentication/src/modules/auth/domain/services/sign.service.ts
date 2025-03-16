export abstract class SignService {
  abstract sign(payload: object): Promise<string>;
}
