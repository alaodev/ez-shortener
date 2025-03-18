import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Url as UrlSchema } from '../schemas/url.schema';
import { Url } from '../../domain/entities/url.entity';
import { DeleteUrlOwnerMatchRepository } from '../../domain/repositories/delete-url-owner-match.repository';
import { DeleteUrlOwnerMatchRepositoryOutput } from '../../domain/types/output/repositories/delete-url-owner-match-repository.output';
import { DeleteUrlOwnerMatchRepositoryInput } from '../../domain/types/inputs/repositories/delete-url-owner-match-repository.input';

@Injectable()
export class MongoDeleteUrlOwnerMatchRepository
  implements DeleteUrlOwnerMatchRepository
{
  constructor(@InjectModel(UrlSchema.name) private urlModel: Model<Url>) {}

  async deleteUrl(
    data: DeleteUrlOwnerMatchRepositoryInput,
  ): Promise<DeleteUrlOwnerMatchRepositoryOutput | null> {
    const deletedUrl = await this.urlModel.findOneAndDelete({
      _id: new Types.ObjectId(data.id),
      owner: new Types.ObjectId(data.owner),
    });
    if (!deletedUrl) return null;
    return {
      id: deletedUrl._id.toString(),
    };
  }
}
