import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class rGeometry extends Document {
  @Prop({ type: String })
  type: string;
  @Prop([[[Number]]])
  coordinates: number[][][];
}

export const rGeometrySchema = SchemaFactory.createForClass(rGeometry);

// export type RiverDocument = HydratedDocument<River>;
export type RiverDocument = River & Document;

@Schema({ collection: 'rivers' })
export class River extends Document {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop({ type: rGeometrySchema })
  geometry: rGeometry;
  @Prop([Number])
  bbox: number[];
  @Prop([Number])
  center: number[];
}

export const RiverSchema = SchemaFactory.createForClass(River);
