import { Model } from 'mongoose';
import { Booking, BookingDocument } from '@database/models/booking.model';
export declare class AnalyticsService {
    private bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    getDailyAnalytics(date: Date): Promise<{
        totalAttendees: number;
        confirmedBookings: number;
        totalRevenue: number;
        bookings: (import("mongoose").Document<unknown, {}, BookingDocument> & Booking & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getOverallAnalytics(): Promise<{
        totalAttendees: number;
        totalRevenue: number;
        genderWise: {};
        poojaWise: {};
        regionWise: {};
    }>;
    getCostAnalysis(eventId: string): Promise<{
        estimatedCost: number;
        actualCost: number;
        variance: number;
        breakdown: {
            ritvik: number;
            items: number;
            food: number;
        };
    }>;
}
//# sourceMappingURL=analytics.service.d.ts.map