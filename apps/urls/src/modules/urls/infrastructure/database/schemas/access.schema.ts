import {
  Prop,
  Schema,
  SchemaFactory,
} from '@ez-shortener/databases/nestjs-mongoose';
import { HydratedDocument, Types } from '@ez-shortener/databases/mongoose';

export type AccessDocument = HydratedDocument<Access>;

@Schema({ timestamps: true })
export class Access {
  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  browserName: string;

  @Prop({ required: false })
  browserVersion: string;

  @Prop({ required: false })
  osName: string;

  @Prop({ required: false })
  osVersion: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Url' })
  url: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  owner: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AccessSchema = SchemaFactory.createForClass(Access);
