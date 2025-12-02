import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private eventModel: Model<any>,
  ) {}

  async findAll(filters?: any) {
    try {
      let query = this.eventModel.find();

      if (filters?.status) {
        query = query.where('status').equals(filters.status);
      }

      if (filters?.venue) {
        query = query.where('venue').regex(new RegExp(filters.venue, 'i'));
      }

      // Don't try to populate priests - just return events directly
      const events = await query.exec();
      return events;
    } catch (error) {
      throw new BadRequestException('Error fetching events');
    }
  }

  async findById(id: string) {
    try {
      const event = await this.eventModel.findById(id).exec();
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      return event;
    } catch (error) {
      throw new NotFoundException('Event not found');
    }
  }

  async create(createEventDto: any) {
    try {
      const event = await this.eventModel.create(createEventDto);
      return event;
    } catch (error) {
      throw new BadRequestException('Error creating event');
    }
  }

  async update(id: string, updateEventDto: any) {
    try {
      const event = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true });
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      return event;
    } catch (error) {
      throw new BadRequestException('Error updating event');
    }
  }

  async delete(id: string) {
    try {
      const event = await this.eventModel.findByIdAndDelete(id);
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      return { message: 'Event deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Error deleting event');
    }
  }
}
