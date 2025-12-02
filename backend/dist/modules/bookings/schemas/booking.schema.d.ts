import { Document, Types } from 'mongoose';
export declare class Booking extends Document {
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    poojaIds: string[];
    paymentId: Types.ObjectId;
    amount: number;
    status: string;
    bookingDate: Date;
    notes: string;
    poojaDetails: any;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking> & Booking & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>> & import("mongoose").FlatRecord<Booking> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=booking.schema.d.ts.map