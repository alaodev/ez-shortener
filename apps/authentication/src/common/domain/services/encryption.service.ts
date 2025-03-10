export abstract class EncryptionService {
  abstract hash(value: string): Promise<string>;
  abstract compare(value: string, encrypted: string): Promise<boolean>;
}
