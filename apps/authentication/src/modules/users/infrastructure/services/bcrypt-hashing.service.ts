import * as bcrypt from 'bcrypt';
import { HashingService } from '../../domain/services/hashing.service';

export class BcryptHashingService implements HashingService {
  async hash(value: string, salt: number = 10): Promise<string> {
    return bcrypt.hash(value, salt);
  }
}
