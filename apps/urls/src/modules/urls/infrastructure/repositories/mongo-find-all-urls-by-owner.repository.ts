import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Url as UrlSchema } from '../database/schemas/url.schema';
import { Url } from '../../domain/entities/url.entity';
import { FindAllUrlsByOwnerRepository } from '../../domain/repositories/find-all-urls-by-owner.repository';
import { FindAllUrlsByOwnerRepositoryOutput } from '../../domain/types/output/repositories/find-all-urls-by-owner-repository.output';

@Injectable()
export class MongoFindAllUrlsByOwnerRepository
  implements FindAllUrlsByOwnerRepository
{
  constructor(@InjectModel(UrlSchema.name) private urlModel: Model<Url>) {}

  async findAllUrlsByOwner(
    ownerId: string,
  ): Promise<FindAllUrlsByOwnerRepositoryOutput> {
    const foundUrls = await this.urlModel.find({
      owner: new Types.ObjectId(ownerId),
    });
    return foundUrls.map((url) => ({
      id: url._id.toString(),
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      owner: url.owner.toString(),
    }));
  }
}
