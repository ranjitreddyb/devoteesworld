export declare class SendWhatsappDto {
    phoneNumber: string;
    templateName: string;
    userData?: {
        name: string;
        eventName: string;
        eventDate?: string;
        poojaNames?: string[];
        totalAmount?: number;
        bookingId?: string;
        orderId?: string;
        transactionId?: string;
    };
    language?: string;
}
export declare class UpdateWhatsappConfigDto {
    adminPhoneNumber?: string;
    reminderDelayMinutes?: number;
}
//# sourceMappingURL=send-whatsapp.dto.d.ts.map