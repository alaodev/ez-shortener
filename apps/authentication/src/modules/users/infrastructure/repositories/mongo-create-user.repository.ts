import { Model } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { User as UserSchema } from '../schemas/user.schema';
import { User } from '../../domain/entities/user.entity';
import { CreateUserRepository } from '../../domain/repositories/create-user.repository';
import { CreateUserRepositoryOutput } from '../../domain/types/outputs/repositories/create-user-repository.output';

@Injectable()
export class MongoCreateUserRepository implements CreateUserRepository {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<User>) {}

  async createUser(user: User): Promise<CreateUserRepositoryOutput> {
    const createdUser = await this.userModel.create(user);
    return {
      id: createdUser._id.toString(),
      username: createdUser.username,
      email: createdUser.email,
    };
  }
}
