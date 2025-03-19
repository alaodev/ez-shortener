import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presentation/auth.controller';
import { serviceProviders, usecaseProviders } from './infrastructure/providers';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [...serviceProviders, ...usecaseProviders],
})
export class AuthModule {}
