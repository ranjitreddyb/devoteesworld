import { Document, Types } from 'mongoose';
export type BookingDocument = Booking & Document;
export declare class Booking {
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    selectedPoojas: string[];
    totalAmount: number;
    status: string;
    paymentId: string;
    attendanceMarked: boolean;
    attendanceTime: Date;
    feedbackProvided: boolean;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking> & Booking & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>> & import("mongoose").FlatRecord<Booking> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=booking.model.d.ts.map