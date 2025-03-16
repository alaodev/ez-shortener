import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Access as AccessSchema } from '../schemas/access.schema';
import { Access } from '../../domain/entities/access.entity';
import { CreateAccessRepository } from '../../domain/repositories/create-access.repository';
import { CreateAccessRepositoryOutput } from '../../domain/types/output/repositories/create-access-repository.output';

@Injectable()
export class MongoCreateAccessRepository implements CreateAccessRepository {
  constructor(
    @InjectModel(AccessSchema.name) private accessModel: Model<Access>,
  ) {}

  async createAccess(access: Access): Promise<CreateAccessRepositoryOutput> {
    const createdAccess = await this.accessModel.create({
      ...access,
      owner: new Types.ObjectId(access.owner),
    });
    return {
      id: createdAccess._id.toString(),
      address: createdAccess.address,
      owner: createdAccess.owner.toString(),
    };
  }
}
