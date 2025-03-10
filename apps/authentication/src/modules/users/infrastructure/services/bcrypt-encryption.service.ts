import * as bcrypt from 'bcrypt';
import { EncryptionService } from '../../domain/services/encryption.service';

export class BcryptEncryptionService implements EncryptionService {
  async hash(value: string, salt: number = 10): Promise<string> {
    return bcrypt.hash(value, salt);
  }
}
