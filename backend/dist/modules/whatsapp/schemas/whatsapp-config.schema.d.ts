import { Document } from 'mongoose';
export declare class WhatsappConfig extends Document {
    adminPhoneNumber: string;
    reminderDelayMinutes: number;
    enabledNotifications: {
        bookingConfirmation: boolean;
        paymentSuccess: boolean;
        paymentFailure: boolean;
        adminAlert: boolean;
        eventReminder: boolean;
    };
    supportedLanguages: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
}
export declare const WhatsappConfigSchema: import("mongoose").Schema<WhatsappConfig, import("mongoose").Model<WhatsappConfig, any, any, any, Document<unknown, any, WhatsappConfig> & WhatsappConfig & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WhatsappConfig, Document<unknown, {}, import("mongoose").FlatRecord<WhatsappConfig>> & import("mongoose").FlatRecord<WhatsappConfig> & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=whatsapp-config.schema.d.ts.map