import { Model } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Injectable } from '@nestjs/common';
import { User as UserSchema } from '../database/schemas/user.schema';
import { FindUserByEmailRepository } from '../../domain/repositories/find-user-by-email.repository';
import { FindUserByEmailRepositoryOutput } from '../../domain/types/outputs/repositories/find-user-by-email-repository.output';

@Injectable()
export class MongoFindUserByEmailRepository
  implements FindUserByEmailRepository
{
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
  ) {}

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
