import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '@database/models/event.model';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async findAll() {
    return this.eventModel.find({ isActive: true }).exec();
  }

  async findOne(id: string) {
    return this.eventModel.findById(id).exec();
  }

  async create(createEventDto: CreateEventDto) {
    const event = new this.eventModel({
      ...createEventDto,
      isActive: true,
    });
    return event.save();
  }

  async update(id: string, updateEventDto: any) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.eventModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
  }
}
