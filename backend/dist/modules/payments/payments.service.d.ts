import { Model } from 'mongoose';
export declare class PaymentsService {
    private paymentModel;
    private bookingModel;
    private razorpay;
    constructor(paymentModel: Model<any>, bookingModel: Model<any>);
    createOrder(userId: string, eventId: string, poojaIds: string[], amount: number): Promise<{
        order_id: string;
        amount: number;
        currency: string;
        key: string;
    }>;
    verifyPayment(paymentData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    createBooking(paymentData: any): Promise<any>;
    getPaymentDetails(orderId: string): Promise<any>;
}
//# sourceMappingURL=payments.service.d.ts.map