import {
  Prop,
  Schema,
  SchemaFactory,
} from '@ez-shortener/databases/nestjs-mongoose';
import { HydratedDocument, Types } from '@ez-shortener/databases/mongoose';
import { Url } from './url.schema';

export type AccessDocument = HydratedDocument<Access>;

@Schema()
export class Access {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Url' })
  owner: Url;
}

export const AccessSchema = SchemaFactory.createForClass(Access);
