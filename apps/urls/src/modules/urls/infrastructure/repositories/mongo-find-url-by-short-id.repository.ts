import { Model } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Url as UrlSchema } from '../schemas/url.schema';
import { Url } from '../../domain/entities/url.entity';
import { FindUrlByShortIdRepository } from '../../domain/repositories/find-url-by-short-url.repository';
import { FindUrlByShortIdRepositoryOutput } from '../../domain/types/output/repositories/find-url-by-short-id-repository.output';

@Injectable()
export class MongoFindUrlByShortIdRepository
  implements FindUrlByShortIdRepository
{
  constructor(@InjectModel(UrlSchema.name) private urlModel: Model<Url>) {}

  async findUrlByShortId(
    shortId: string,
  ): Promise<FindUrlByShortIdRepositoryOutput | null> {
    const foundUrl = await this.urlModel.findOne({ shortId });
    if (!foundUrl) return null;
    return {
      id: foundUrl._id.toString(),
      originalUrl: foundUrl.originalUrl,
      shortId: foundUrl.shortId,
    };
  }
}
