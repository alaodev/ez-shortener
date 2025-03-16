import * as bcrypt from 'bcrypt';
import { CompareService } from '../../domain/services/compare.service';

export class BcryptCompareService implements CompareService {
  async compare(value: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(value, encrypted);
  }
}
