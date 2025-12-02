import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  eventId: Types.ObjectId;

  @Prop({ type: [String], required: true })
  poojaIds: string[];

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  razorpayOrderId: string;

  @Prop()
  razorpayPaymentId: string;

  @Prop()
  razorpaySignature: string;

  @Prop({ enum: ['pending', 'completed', 'failed'], default: 'pending' })
  status: string;

  @Prop()
  failureReason: string;

  @Prop({ type: Object })
  bookingDetails: any;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
