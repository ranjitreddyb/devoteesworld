import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookingsService {
  constructor(@InjectModel('Booking') private bookingModel: Model<any>) {}

  async getAllBookings() {
    console.log('📋 Fetching all bookings from DB');
    return this.bookingModel.find().populate('userId').populate('eventId');
  }

  async createBooking(bookingData: any) {
    return this.bookingModel.create(bookingData);
  }

  async getUserBookings(userId: string) {
    return this.bookingModel.find({ userId }).populate('eventId');
  }

  async getBookingDetails(bookingId: string) {
    return this.bookingModel.findById(bookingId).populate('userId').populate('eventId');
  }

  async getEventBookings(eventId: string) {
    return this.bookingModel.find({ eventId }).populate('userId');
  }
}
