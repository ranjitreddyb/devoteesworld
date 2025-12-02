import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ type: [String], required: true })
  poojaIds: string[];

  @Prop({ type: Types.ObjectId, ref: 'Payment' })
  paymentId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' })
  status: string;

  @Prop({ default: Date.now })
  bookingDate: Date;

  @Prop()
  notes: string;

  @Prop({ type: Object })
  poojaDetails: any;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
