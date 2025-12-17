export class SendWhatsappDto {
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

export class UpdateWhatsappConfigDto {
  adminPhoneNumber?: string;
  reminderDelayMinutes?: number;
}
