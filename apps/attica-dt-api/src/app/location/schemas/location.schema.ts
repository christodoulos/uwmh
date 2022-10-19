import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class GeoPoint {
  @Prop({ default: 'Point' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[];
}

@Schema()
export class GeoPolygon {
  @Prop({ default: 'Polygon' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: GeoPoint[];
}

@Schema()
export class GeoMultiPolygon {
  @Prop({ default: 'MultiPolygon' })
  type: string;
  @Prop({ required: true, index: '2dsphere' })
  coordinates: GeoPolygon[];
}

@Schema()
export class GeoName {
  @Prop()
  name: string;
}

@Schema()
export class Location {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop()
  properties: GeoName;
  @Prop()
  geometry: GeoMultiPolygon;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
