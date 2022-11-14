import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Geometry {
  @Prop({ type: String })
  type: string;
  @Prop([[[Number]]])
  coordinates: number[][][];
}

export const GeometrySchema = SchemaFactory.createForClass(Geometry);

export type RiverDocument = HydratedDocument<River>;

@Schema({ collection: 'rivers' })
export class River {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop({ type: GeometrySchema })
  geometry: Geometry;
  @Prop([Number])
  bbox: number[];
  @Prop([Number])
  center: number[];
}

export const RiverSchema = SchemaFactory.createForClass(River);
