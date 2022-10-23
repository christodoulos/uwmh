import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MultiBoundaryDocument = MultiBoundary & Document;

@Schema()
export class Point {
  @Prop({ default: 'Point' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[];
}

@Schema()
export class Polygon {
  @Prop({ default: 'Polygon' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: Point[];
}

@Schema()
export class MultiPolygon {
  @Prop({ default: 'MultiPolygon' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: Polygon[];
}

@Schema()
export class Properties {
  @Prop()
  desc: string;
}

@Schema({ collection: 'multi_boundary' })
export class MultiBoundary {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop()
  properties: Properties;
  @Prop()
  geometry: MultiPolygon;
}

export const MultiBoudarySchema = SchemaFactory.createForClass(MultiBoundary);
