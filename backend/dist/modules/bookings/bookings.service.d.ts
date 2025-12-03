import { Model } from 'mongoose';
export declare class BookingsService {
    private bookingModel;
    constructor(bookingModel: Model<any>);
    getAllBookings(): Promise<Omit<Omit<any, never>, never>[]>;
    createBooking(bookingData: any): Promise<any>;
    getUserBookings(userId: string): Promise<Omit<any, never>[]>;
    getBookingDetails(bookingId: string): Promise<any>;
    getEventBookings(eventId: string): Promise<Omit<any, never>[]>;
}
//# sourceMappingURL=bookings.service.d.ts.map