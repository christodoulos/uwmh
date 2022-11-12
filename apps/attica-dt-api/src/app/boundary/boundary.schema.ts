import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
class bGeometry extends Document {
  @Prop({ type: String })
  type: string;
  @Prop([[[[Number]]]])
  coordinates: number[][][][];
}
const bGeometrySchema = SchemaFactory.createForClass(bGeometry);

// export type BoundaryDocument = HydratedDocument<Boundary>;
export type BoundaryDocument = Boundary & Document;

@Schema({ collection: 'boundaries' })
export class Boundary extends Document {
  @Prop({ default: 'Feature' })
  type: string;
  @Prop({ type: bGeometrySchema })
  geometry: bGeometry;
  @Prop([Number])
  bbox: number[];
  @Prop([Number])
  center: number[];
}

export const BoundarySchema = SchemaFactory.createForClass(Boundary);
