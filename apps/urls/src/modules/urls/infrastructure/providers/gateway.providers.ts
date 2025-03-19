import { Provider } from '@nestjs/common';
import { UrlsCountGateway } from '../../presentation/gateways/urls-count.gateway';

export const gatewayProviders: Provider[] = [UrlsCountGateway];
