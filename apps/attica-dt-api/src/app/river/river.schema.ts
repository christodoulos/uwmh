import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  MultiLineString,
  BBox,
  Point,
  Properties,
} from '../geojson.mongoose.schema';
import { Document } from 'mongoose';

@Schema({ collection: 'rivers' })
export class River {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop()
  geometry: MultiLineString;
  @Prop()
  bbox: BBox;
  @Prop()
  center: Point;
  @Prop()
  properties: Properties;
}

export type RiverDocument = River & Document;
export const RiverSchema = SchemaFactory.createForClass(River);
