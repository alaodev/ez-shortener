import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Global()
@Module({})
export class AuthGuardModule {
  private static readonly logger = new Logger(AuthGuardModule.name);

  static registerAsync(options: {
    useFactory: (
      ...args: unknown[]
    ) => Promise<JwtModuleOptions> | JwtModuleOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      module: AuthGuardModule,
      imports: [
        JwtModule.registerAsync({
          useFactory: async (...args: unknown[]) => {
            const config = await options.useFactory(...args);
            AuthGuardModule.logger.log('JWT configuration successfully loaded');
            return {
              ...config,
            };
          },
          inject: options.inject || [],
        }),
      ],
      exports: [JwtModule],
    };
  }
}
