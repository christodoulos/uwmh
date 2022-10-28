import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BBox {
  @Prop()
  type: [number, number, number, number];
}

@Schema()
export class Point {
  @Prop({ default: 'Point' })
  type: string;
  @Prop({ required: true })
  coordinates: number[];
}

@Schema()
export class LineString {
  @Prop({ default: 'LineString' })
  type: string;
  @Prop({ required: true })
  coordinates: number[][];
}

@Schema()
export class Polygon {
  @Prop({ default: 'Polygon' })
  type: string;
  @Prop({ required: true })
  coordinates: Point[];
}

@Schema()
export class MultiLineString {
  @Prop({ default: 'MultiLineString' })
  type: string;
  @Prop({ required: true })
  coordinates: LineString[];
}

@Schema()
export class MultiPolygon {
  @Prop({ default: 'MultiPolygon' })
  type: string;
  @Prop({ required: true })
  coordinates: Polygon[];
}

@Schema()
export class Properties {
  @Prop()
  prop: string;
}
