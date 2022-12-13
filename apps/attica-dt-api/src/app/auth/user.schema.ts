import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  provider: string;
  @Prop({ required: true })
  providerId: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  given_name: string;
  @Prop({ required: true })
  family_name: string;
  @Prop({ required: true })
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
