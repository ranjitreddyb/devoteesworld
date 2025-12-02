import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: [String], required: true })
  selectedPoojas: string[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
  status: string;

  @Prop()
  paymentId: string;

  @Prop()
  attendanceMarked: boolean;

  @Prop()
  attendanceTime: Date;

  @Prop()
  feedbackProvided: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);