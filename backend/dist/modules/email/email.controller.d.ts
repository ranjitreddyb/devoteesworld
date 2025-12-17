import { EmailService } from './email.service';
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    sendTest(body: {
        email: string;
        name?: string;
    }): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
    sendBookingConfirmation(bookingData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    sendPaymentSuccess(paymentData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getStatus(): Promise<{
        status: string;
        message: string;
        timestamp: string;
    }>;
}
//# sourceMappingURL=email.controller.d.ts.map