import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  toJSON: {
    transform: function (_doc, ret) {
      delete ret._id;
    },
  },
})
export class User {
  @Prop()
  provider: string;
  @Prop()
  providerId: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  name: string;
  @Prop()
  given_name: string;
  @Prop()
  family_name: string;
  @Prop()
  picture: string;
  @Prop()
  linkedin: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
