import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email?: string;

  @Prop({ required: true })
  password?: string;

  @Prop({ required: true })
  name?: string;

  @Prop({ required: true })
  dateOfBirth?: Date;

  @Prop()
  address?: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ enum: ['single', 'married', 'divorced', 'widowed'] })
  maritalStatus?: string;

  @Prop()
  dateOfMarriage?: Date;

  @Prop({ type: Object })
  healthStatus?: {
    diabetic?: boolean;
    bp?: boolean;
    heartAilment?: boolean;
    recentSurgery?: boolean;
  };

  @Prop()
  aadharCardUrl?: string;

  @Prop()
  photoUrl?: string;

  @Prop({ type: [String], default: [] })
  faceVectors?: string[];

  @Prop({ enum: ['user', 'admin', 'ritvik'], default: 'user' })
  role?: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ type: Object })
  location?: {
    latitude?: number;
    longitude?: number;
    region?: string;
  };

  @Prop({ default: 'en' })
  preferredLanguage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
