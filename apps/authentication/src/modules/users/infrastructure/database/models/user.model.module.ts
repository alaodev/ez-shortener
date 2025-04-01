import { MongooseModule } from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: function () {
          const schema = UserSchema;
          return schema;
        },
        collection: 'users',
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class UserModelModule {}
