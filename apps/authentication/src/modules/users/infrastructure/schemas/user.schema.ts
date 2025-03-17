import {
  Prop,
  Schema,
  SchemaFactory,
} from '@ez-shortener/databases/nestjs-mongoose';
import { HydratedDocument } from '@ez-shortener/databases/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
