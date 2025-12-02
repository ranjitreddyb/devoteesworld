import { ConfigService } from '@nestjs/config';
export declare class NotificationService {
    private configService;
    private twilioClient;
    constructor(configService: ConfigService);
    private initializeTwilio;
    sendEmail(to: string, subject: string, text: string): Promise<{
        success: boolean;
    }>;
    sendSMS(phoneNumber: string, message: string): Promise<any>;
    sendWhatsApp(phoneNumber: string, message: string): Promise<any>;
}
//# sourceMappingURL=notification.service.d.ts.map