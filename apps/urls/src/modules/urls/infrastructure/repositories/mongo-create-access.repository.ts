import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { Access as AccessSchema } from '../database/schemas/access.schema';
import { Access as AccessEntity } from '../../domain/entities/access.entity';
import { CreateAccessRepository } from '../../domain/repositories/create-access.repository';
import { CreateAccessRepositoryOutput } from '../../domain/types/output/repositories/create-access-repository.output';

@Injectable()
export class MongoCreateAccessRepository implements CreateAccessRepository {
  constructor(
    @InjectModel(AccessSchema.name) private accessModel: Model<AccessSchema>,
  ) {}

  async createAccess(
    access: AccessEntity,
  ): Promise<CreateAccessRepositoryOutput> {
    const createdAccess = await this.accessModel.create({
      ...access,
      url: new Types.ObjectId(access.url),
      owner: new Types.ObjectId(access.owner),
    });
    return {
      id: createdAccess._id.toString(),
      address: createdAccess.address,
      browserName: createdAccess.browserName,
      browserVersion: createdAccess.browserVersion,
      osName: createdAccess.osName,
      osVersion: createdAccess.osVersion,
      url: createdAccess.url.toString(),
      createdAt: createdAccess.createdAt,
      updatedAt: createdAccess.updatedAt,
    };
  }
}
