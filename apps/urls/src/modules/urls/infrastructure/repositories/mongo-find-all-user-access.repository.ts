import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import {
  Url as UrlSchema,
  AccessDocument,
  UrlDocument,
} from '../database/schemas';
import { FindAllUserAccessRepository } from '../../domain/repositories/find-all-user-access.repository';
import { FindAllUserAccessRepositoryOutput } from '../../domain/types/output/repositories';

type AccessPopulatedDocument = Omit<AccessDocument, 'url'> & {
  url: UrlDocument;
};

@Injectable()
export class MongoFindAllUserAccessRepository
  implements FindAllUserAccessRepository
{
  constructor(
    @InjectModel(UrlSchema.name) private urlModel: Model<UrlSchema>,
  ) {}

  async findAllUserAccess(
    userId: string,
  ): Promise<FindAllUserAccessRepositoryOutput> {
    const foundAccess: AccessPopulatedDocument[] =
      await this.urlModel.aggregate([
        {
          $match: { owner: new Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: 'access',
            localField: '_id',
            foreignField: 'url',
            as: 'access',
          },
        },
        {
          $unwind: '$access',
        },
        {
          $sort: { 'access.createdAt': -1 },
        },
        {
          $set: {
            'access.url': {
              _id: '$_id',
              originalUrl: '$originalUrl',
              shortId: '$shortId',
              owner: '$owner',
              createdAt: '$createdAt',
              updatedAt: '$updatedAt',
            },
          },
        },
        {
          $replaceRoot: { newRoot: '$access' },
        },
      ]);
    return foundAccess.map((access) => ({
      id: access._id.toString(),
      address: access.address,
      browserName: access.browserName,
      browserVersion: access.browserVersion,
      osName: access.osName,
      osVersion: access.osVersion,
      url: {
        id: access.url._id.toString(),
        originalUrl: access.url.originalUrl,
        shortId: access.url.shortId,
        owner: access.url.owner.toString(),
        createdAt: access.url.createdAt,
        updatedAt: access.url.updatedAt,
      },
      createdAt: access.createdAt,
      updatedAt: access.updatedAt,
    }));
  }
}
