import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Pooja {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  durationMinutes: number;

  @Prop()
  significance: string;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  venue: string;

  @Prop({ default: 'future', enum: ['past', 'ongoing', 'future', 'cancelled'] })
  status: string;

  @Prop({ type: [Pooja], default: [] })
  poojas: Pooja[];

  @Prop({ default: 0 })
  attendees: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  imageUrl: string;

  @Prop()
  tags: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
