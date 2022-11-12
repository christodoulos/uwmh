import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AtticaDocument = HydratedDocument<Attica>;

@Schema({ collection: 'attica' })
export class Attica {
  @Prop({ type: String })
  boundary: string;
  @Prop({ type: [String] })
  rivers: string[];
}

export const AtticaSchema = SchemaFactory.createForClass(Attica);
