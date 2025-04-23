import { Provider } from '@nestjs/common';
import {
  UrlsCountGateway,
  UserAccessGateway,
} from '../../presentation/gateways';

export const gatewayProviders: Provider[] = [
  UrlsCountGateway,
  UserAccessGateway,
];
