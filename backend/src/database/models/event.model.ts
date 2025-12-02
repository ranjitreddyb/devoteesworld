import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Pooja {
  @Prop({ required: true })
  name: string;

  @Prop()
  durationMinutes: number;

  @Prop()
  attire: string;

  @Prop()
  itemsToBring: string[];

  @Prop()
  significance: string;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  priests: Types.ObjectId[];

  @Prop({ default: 0 })
  price: number;
}

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  venue: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ type: [Pooja], default: [] })
  poojas: Pooja[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  celebrityAttendees: Types.ObjectId[];

  @Prop({ enum: ['ongoing', 'completed', 'future'], default: 'future' })
  status: string;

  @Prop({ default: 0 })
  totalAttendees: number;

  @Prop({ default: 0 })
  maxAttendees: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  organizer: Types.ObjectId;

  @Prop({ type: Object })
  dailySignificance: {
    date: Date;
    significanceText: string;
    muhurtams: string;
    recommendedPoojas: string[];
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);