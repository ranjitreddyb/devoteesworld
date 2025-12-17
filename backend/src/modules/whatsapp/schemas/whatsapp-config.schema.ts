import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WhatsappConfig extends Document {
  @Prop({ required: true, match: /^\+91[0-9]{10}$/ })
  adminPhoneNumber: string;

  @Prop({ required: true, default: 1440, min: 60, max: 1440 })
  reminderDelayMinutes: number;

  @Prop({
    type: {
      bookingConfirmation: Boolean,
      paymentSuccess: Boolean,
      paymentFailure: Boolean,
      adminAlert: Boolean,
      eventReminder: Boolean,
    },
    default: {
      bookingConfirmation: true,
      paymentSuccess: true,
      paymentFailure: true,
      adminAlert: true,
      eventReminder: true,
    },
  })
  enabledNotifications: {
    bookingConfirmation: boolean;
    paymentSuccess: boolean;
    paymentFailure: boolean;
    adminAlert: boolean;
    eventReminder: boolean;
  };

  @Prop({ type: [String], default: ['en', 'hi', 'ta', 'te', 'ka', 'ml', 'gu', 'mr'] })
  supportedLanguages: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: String })
  updatedBy: string;
}

export const WhatsappConfigSchema = SchemaFactory.createForClass(WhatsappConfig);
