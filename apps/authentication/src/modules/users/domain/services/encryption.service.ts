export abstract class EncryptionService {
  abstract hash(value: string): Promise<string>;
}
