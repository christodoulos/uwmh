import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Geometry {
  @Prop({ type: String })
  type: string;
  @Prop([[[[Number]]]])
  coordinates: number[][][][];
}

const GeometrySchema = SchemaFactory.createForClass(Geometry);

export type BoundaryDocument = HydratedDocument<Boundary>;

@Schema({ collection: 'boundaries' })
export class Boundary {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop({ type: GeometrySchema })
  geometry: Geometry;
  @Prop([Number])
  bbox: number[];
  @Prop([Number])
  center: number[];
}

export const BoundarySchema = SchemaFactory.createForClass(Boundary);
