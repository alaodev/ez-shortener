import {
  Prop,
  Schema,
  SchemaFactory,
} from '@ez-shortener/databases/nestjs-mongoose';
import { HydratedDocument, Types } from '@ez-shortener/databases/mongoose';

export type UrlDocument = HydratedDocument<Url>;

@Schema({ timestamps: true })
export class Url {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortId: string;

  @Prop({ required: true, type: Types.ObjectId })
  owner: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
