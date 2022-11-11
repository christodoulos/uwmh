import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class BGeometry {
  @Prop()
  type: string;
  @Prop([[[[Number]]]])
  coordinates: number[][][][];
}
const BGeometrySchema = SchemaFactory.createForClass(BGeometry);

export type BoundaryDocument = HydratedDocument<Boundary>;

@Schema({ collection: 'boundaries' })
export class Boundary {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop({ type: BGeometrySchema })
  geometry: BGeometry;
  @Prop([Number])
  bbox: number[];
  @Prop([Number])
  center: number[];
}

export const BoundarySchema = SchemaFactory.createForClass(Boundary);
