import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MultilineDocument = Multiline & Document;

@Schema()
export class Point {
  @Prop({ default: 'Point' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[];
}

@Schema()
export class LineString {
  @Prop({ default: 'LineString' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[][];
}

@Schema()
export class MultiLineStringGeometry {
  @Prop({ default: 'MultiLineString' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: LineString[];
}

@Schema()
export class Properties {
  @Prop()
  desc: string;
}

@Schema()
export class Feature {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop()
  properties: Properties;
  @Prop()
  geometry: MultiLineStringGeometry;
}

@Schema()
export class Multiline {
  @Prop()
  type: string;
  @Prop()
  geojson: Feature;
}

export const MultiLineSchema = SchemaFactory.createForClass(Multiline);
