import { ObjectId, Model } from '@ez-shortener/databases/mongoose';
import {
  getModelToken,
  MongooseModule,
} from '@ez-shortener/databases/nestjs-mongoose';
import { Module } from '@nestjs/common';
import {
  Url,
  UrlSchema,
  Access,
  AccessDocument,
  AccessSchema,
} from '../schemas';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Access.name,
        useFactory: function () {
          const schema = AccessSchema;
          return schema;
        },
        collection: 'access',
      },
      {
        name: Url.name,
        useFactory: (accessModel: Model<AccessDocument>) => {
          const schema = UrlSchema;
          schema.pre('findOneAndDelete', async function (next) {
            const urlId = this.getQuery()._id as ObjectId;
            await accessModel.deleteMany({
              url: urlId,
            });
            next();
          });
          return schema;
        },
        inject: [getModelToken(Access.name)],
        collection: 'urls',
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class ModelsModule {}
