import { nanoid } from 'nanoid';
import { GenerateIdentifierService } from '../../domain/services/ generate-identifier.service';

export class NanoidGenerateIdentifierService
  implements GenerateIdentifierService
{
  generate(size: number): string {
    return nanoid(size);
  }
}
