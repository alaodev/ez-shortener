import { Provider } from '@nestjs/common';
import { NanoidGenerateIdentifierService } from '../services/nanoid-generate-identifier.service';

export const serviceProviders: Provider[] = [
  {
    provide: 'GenerateIdentifierService',
    useClass: NanoidGenerateIdentifierService,
  },
];
