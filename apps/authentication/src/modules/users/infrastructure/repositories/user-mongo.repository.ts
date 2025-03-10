import { Model } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { User as UserSchema } from '../schemas/user.schema';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import {
  CreateUserRepositoryOutput,
  FindUserByEmailRepositoryOutput,
} from '../../domain/types/outputs/repositories/user-repository.output';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<User>) {}

  async createUser(user: User): Promise<CreateUserRepositoryOutput> {
    const createdUser = await this.userModel.create(user);
    return {
      id: createdUser._id.toString(),
      username: createdUser.username,
      email: createdUser.email,
    };
  }

  async findUserByEmail(
    email: string,
  ): Promise<FindUserByEmailRepositoryOutput | null> {
    const foundUser = await this.userModel.findOne({ email });
    if (!foundUser) return null;
    return {
      id: foundUser._id.toString(),
      username: foundUser.username,
      email: foundUser.email,
      password: foundUser.password,
    };
  }
}
