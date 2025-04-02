import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Url as UrlSchema } from '../database/schemas/url.schema';
import { Url as UrlEntity } from '../../domain/entities/url.entity';
import { CreateUrlRepository } from '../../domain/repositories/create-url.repository';
import { CreateUrlRepositoryOutput } from '../../domain/types/output/repositories/create-url-repository.output';

@Injectable()
export class MongoCreateUrlRepository implements CreateUrlRepository {
  constructor(
    @InjectModel(UrlSchema.name) private urlModel: Model<UrlSchema>,
  ) {}

  async createUrl(url: UrlEntity): Promise<CreateUrlRepositoryOutput> {
    const createdUrl = await this.urlModel.create({
      ...url,
      owner: new Types.ObjectId(url.owner),
    });
    return {
      id: createdUrl._id.toString(),
      originalUrl: createdUrl.originalUrl,
      shortId: createdUrl.shortId,
      owner: createdUrl.owner.toString(),
      createdAt: createdUrl.createdAt,
      updatedAt: createdUrl.updatedAt,
    };
  }
}
