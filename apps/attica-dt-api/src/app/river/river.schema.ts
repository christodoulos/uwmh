import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class RGeometry {
  @Prop(String)
  type: string;
  @Prop([[[Number]]])
  coordinates: number[][][];
}

const RGeometrySchema = SchemaFactory.createForClass(RGeometry);

export type RiverDocument = HydratedDocument<River>;

@Schema({ collection: 'rivers' })
export class River {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop({ type: RGeometrySchema })
  geometry: RGeometry;
  @Prop([Number])
  bbox: number[];
  @Prop([Number])
  center: number[];
}

export const RiverSchema = SchemaFactory.createForClass(River);
