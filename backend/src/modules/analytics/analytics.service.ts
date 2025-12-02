import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '@database/models/booking.model';

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async getDailyAnalytics(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await this.bookingModel.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    return {
      totalAttendees: bookings.length,
      confirmedBookings: bookings.filter((b) => b.status === 'confirmed').length,
      totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
      bookings,
    };
  }

  async getOverallAnalytics() {
    const allBookings = await this.bookingModel.find().populate('userId').populate('eventId');

    const genderWise = {};
    const poojaWise = {};
    const regionWise = {};

    allBookings.forEach((booking) => {
      // Aggregate by gender, pooja, region
    });

    return {
      totalAttendees: allBookings.length,
      totalRevenue: allBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      genderWise,
      poojaWise,
      regionWise,
    };
  }

  async getCostAnalysis(eventId: string) {
    return {
      estimatedCost: 50000,
      actualCost: 45000,
      variance: 5000,
      breakdown: {
        ritvik: 10000,
        items: 15000,
        food: 20000,
      },
    };
  }
}