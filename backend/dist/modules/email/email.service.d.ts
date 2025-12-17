import { ConfigService } from '@nestjs/config';
interface EmailPayload {
    to: string;
    templateId: string;
    templateData?: Record<string, any>;
}
export declare class EmailService {
    private configService;
    private logger;
    private transporter;
    constructor(configService: ConfigService);
    private initializeEmailService;
    sendEmail(payload: EmailPayload): Promise<boolean>;
    private getEmailTemplate;
    sendWelcomeEmail(email: string, name: string): Promise<boolean>;
    sendBookingConfirmation(email: string, data: any): Promise<boolean>;
    sendPaymentSuccess(email: string, data: any): Promise<boolean>;
    sendPaymentFailure(email: string, data: any): Promise<boolean>;
    sendAdminNotification(data: any): Promise<boolean>;
}
export {};
//# sourceMappingURL=email.service.d.ts.map