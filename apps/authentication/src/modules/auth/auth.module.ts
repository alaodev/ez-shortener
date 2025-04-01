import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presentation/auth.controller';
import { UserModelModule } from '../users/infrastructure/database/models/user.model.module';
import {
  repositoryProviders,
  serviceProviders,
  usecaseProviders,
} from './infrastructure/providers';

@Module({
  imports: [UserModelModule, UsersModule],
  controllers: [AuthController],
  providers: [...repositoryProviders, ...serviceProviders, ...usecaseProviders],
})
export class AuthModule {}
