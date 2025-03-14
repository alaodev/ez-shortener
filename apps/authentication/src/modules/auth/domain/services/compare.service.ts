export abstract class CompareService {
  abstract compare(value: string, encrypted: string): Promise<boolean>;
}
