import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    getAllBookings(): Promise<Omit<Omit<any, never>, never>[]>;
    createBooking(bookingData: any): Promise<void>;
    getUserBookings(userId: string): Promise<Omit<any, never>[]>;
    getBookingDetails(bookingId: string): Promise<any>;
    getEventBookings(eventId: string): Promise<Omit<any, never>[]>;
}
//# sourceMappingURL=bookings.controller.d.ts.map