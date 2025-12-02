import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<any>,
  ) {}

  async createBooking(bookingData: any) {
    try {
      console.log('📝 Creating booking with data:', bookingData);

      // Validate ObjectIds
      if (!bookingData.userId) {
        throw new BadRequestException('userId is required');
      }
      if (!bookingData.eventId) {
        throw new BadRequestException('eventId is required');
      }

      if (!Types.ObjectId.isValid(bookingData.userId)) {
        console.log('❌ Invalid userId format:', bookingData.userId);
        throw new BadRequestException(`Invalid userId format: ${bookingData.userId}`);
      }
      if (!Types.ObjectId.isValid(bookingData.eventId)) {
        console.log('❌ Invalid eventId format:', bookingData.eventId);
        throw new BadRequestException(`Invalid eventId format: ${bookingData.eventId}`);
      }

      const booking = await this.bookingModel.create({
        userId: new Types.ObjectId(bookingData.userId),
        eventId: new Types.ObjectId(bookingData.eventId),
        poojaIds: bookingData.poojaIds,
        paymentId: bookingData.paymentId,
        amount: bookingData.amount,
        status: 'confirmed',
        bookingDate: new Date(),
        poojaDetails: bookingData.poojaDetails,
      });

      console.log('✅ Booking created successfully:', booking._id);
      return booking;
    } catch (error) {
      console.error('❌ Booking creation error:', error);
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  async getUserBookings(userId: string) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException(`Invalid userId format: ${userId}`);
      }

      const bookings = await this.bookingModel
        .find({ userId: new Types.ObjectId(userId) })
        .populate('eventId')
        .populate('paymentId')
        .sort({ bookingDate: -1 });
      return bookings;
    } catch (error) {
      throw new Error(`Failed to fetch user bookings: ${error.message}`);
    }
  }

  async getBookingDetails(bookingId: string) {
    try {
      if (!Types.ObjectId.isValid(bookingId)) {
        throw new BadRequestException(`Invalid bookingId format: ${bookingId}`);
      }

      const booking = await this.bookingModel
        .findById(new Types.ObjectId(bookingId))
        .populate('eventId')
        .populate('paymentId');
      return booking;
    } catch (error) {
      throw new Error(`Failed to fetch booking details: ${error.message}`);
    }
  }

  async getEventBookings(eventId: string) {
    try {
      if (!Types.ObjectId.isValid(eventId)) {
        throw new BadRequestException(`Invalid eventId format: ${eventId}`);
      }

      const bookings = await this.bookingModel
        .find({ eventId: new Types.ObjectId(eventId) })
        .populate('userId')
        .sort({ bookingDate: -1 });
      return bookings;
    } catch (error) {
      throw new Error(`Failed to fetch event bookings: ${error.message}`);
    }
  }
}
