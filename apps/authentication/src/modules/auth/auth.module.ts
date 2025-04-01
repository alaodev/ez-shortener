import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import {
  User,
  UserSchema,
} from '../users/infrastructure/database/schemas/user.schema';
import { AuthController } from './presentation/auth.controller';
import {
  repositoryProviders,
  serviceProviders,
  usecaseProviders,
} from './infrastructure/providers';
import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [...repositoryProviders, ...serviceProviders, ...usecaseProviders],
})
export class AuthModule {}
