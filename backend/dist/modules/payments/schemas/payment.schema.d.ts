import { Document, Types } from 'mongoose';
export declare class Payment extends Document {
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    poojaIds: string[];
    amount: number;
    currency: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    status: string;
    failureReason: string;
    bookingDetails: any;
}
export declare const PaymentSchema: import("mongoose").Schema<Payment, import("mongoose").Model<Payment, any, any, any, Document<unknown, any, Payment> & Payment & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, Document<unknown, {}, import("mongoose").FlatRecord<Payment>> & import("mongoose").FlatRecord<Payment> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=payment.schema.d.ts.map