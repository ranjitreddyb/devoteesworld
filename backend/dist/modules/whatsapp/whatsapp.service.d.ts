import { Model } from 'mongoose';
import { Queue } from 'bull';
import { WhatsappConfig } from './schemas/whatsapp-config.schema';
import { SendWhatsappDto } from './dto/send-whatsapp.dto';
export declare class WhatsappService {
    private whatsappConfigModel;
    private reminderQueue;
    private readonly logger;
    private readonly gupshupApiUrl;
    private readonly gupshupApiKey;
    private readonly businessPhoneNumber;
    constructor(whatsappConfigModel: Model<WhatsappConfig>, reminderQueue: Queue);
    sendMessage(dto: SendWhatsappDto): Promise<any>;
    sendBookingConfirmation(userPhone: string, userData: any, lang?: string): Promise<any>;
    sendPaymentSuccess(userPhone: string, userData: any, lang?: string): Promise<any>;
    sendPaymentFailure(userPhone: string, userData: any, lang?: string): Promise<any>;
    notifyAdminBooking(details: any): Promise<any>;
    notifyAdminPayment(details: any): Promise<any>;
    sendEventReminder(userPhone: string, userData: any, lang?: string): Promise<any>;
    scheduleReminder(bookingId: string, userPhone: string, userData: any, lang?: string): Promise<void>;
    getWhatsappConfig(): Promise<WhatsappConfig>;
    updateWhatsappConfig(updates: any): Promise<WhatsappConfig>;
}
//# sourceMappingURL=whatsapp.service.d.ts.map