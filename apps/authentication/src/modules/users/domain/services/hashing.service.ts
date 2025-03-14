export abstract class HashingService {
  abstract hash(value: string): Promise<string>;
}
