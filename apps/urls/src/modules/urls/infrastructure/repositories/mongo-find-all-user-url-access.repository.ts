import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Url as UrlSchema, AccessDocument } from '../database/schemas';
import { FindAllUserUrlAccessRepository } from '../../domain/repositories/find-all-user-url-access.repository';
import { FindAllUserUrlAccessRepositoryOutput } from '../../domain/types/output/repositories/find-all-user-url-access-repository.output';

@Injectable()
export class MongoFindAllUserUrlAccessRepository
  implements FindAllUserUrlAccessRepository
{
  constructor(
    @InjectModel(UrlSchema.name) private urlModel: Model<UrlSchema>,
  ) {}

  async findAllUserUrlAccess(
    ownerId: string,
    urlId: string,
  ): Promise<FindAllUserUrlAccessRepositoryOutput> {
    const foundAccess: AccessDocument[] = await this.urlModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(urlId),
          owner: new Types.ObjectId(ownerId),
        },
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
      url: urlId,
      createdAt: access.createdAt,
      updatedAt: access.updatedAt,
    }));
  }
}
