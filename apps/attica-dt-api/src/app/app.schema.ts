import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'attica' })
export class Attica {
  @Prop()
  boundary: Types.ObjectId;
  @Prop()
  rivers: Types.ObjectId[];
}

export type AtticaDocument = Attica & Document;
export const AtticaSchema = SchemaFactory.createForClass(Attica);
