import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import { CreateUserUseCaseImpl } from './application/use-cases/create-user.usecase.impl';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UserMongoRepository } from './infrastructure/repositories/user-mongo.repository';
import { BcryptEncryptionService } from './infrastructure/services/bcrypt-encryption.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CreateUserUseCaseImpl,
    { provide: 'UserRepository', useClass: UserMongoRepository },
    { provide: 'EncryptionService', useClass: BcryptEncryptionService },
  ],
})
export class UsersModule {}
