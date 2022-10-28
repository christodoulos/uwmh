import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  BBox,
  Point,
  Properties,
  MultiPolygon,
} from '../geojson.mongoose.schema';
import { Document } from 'mongoose';

@Schema({ collection: 'boundaries' })
export class Boundary {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop()
  geometry: MultiPolygon;
  @Prop()
  bbox: BBox;
  @Prop()
  center: Point;
  @Prop()
  properties: Properties;
}

export type BoundaryDocument = Boundary & Document;
export const BoundarySchema = SchemaFactory.createForClass(Boundary);
