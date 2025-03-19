import { Provider } from '@nestjs/common';
import { BcryptCompareService, JwtSignService } from '../services';

export const serviceProviders: Provider[] = [
  { provide: 'CompareService', useClass: BcryptCompareService },
  { provide: 'SignService', useClass: JwtSignService },
];
