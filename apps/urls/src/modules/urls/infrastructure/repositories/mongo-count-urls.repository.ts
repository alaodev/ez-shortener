import { Model } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Url as UrlSchema } from '../database/schemas/url.schema';
import { CountUrlsRepository } from '../../domain/repositories/count-urls.repository';
import { CountUrlsRepositoryOutput } from '../../domain/types/output/repositories/count-urls-repository.output';

@Injectable()
export class MongoCountUrlsRepository implements CountUrlsRepository {
  constructor(
    @InjectModel(UrlSchema.name) private urlModel: Model<UrlSchema>,
  ) {}

  async countUrls(): Promise<CountUrlsRepositoryOutput> {
    const count = await this.urlModel.countDocuments();
    return { count };
  }
}
