import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(body: {
        userId: string;
        eventId: string;
        poojaIds: string[];
        amount: number;
    }): Promise<{
        order_id: string;
        amount: number;
        currency: string;
        key: string;
    }>;
    verifyPayment(paymentData: any): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        booking: any;
    }>;
    getPaymentDetails(orderId: string): Promise<any>;
}
//# sourceMappingURL=payments.controller.d.ts.map