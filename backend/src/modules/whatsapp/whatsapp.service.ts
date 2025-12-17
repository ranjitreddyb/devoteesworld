import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import axios from 'axios';
import { WhatsappConfig } from './schemas/whatsapp-config.schema';
import { SendWhatsappDto } from './dto/send-whatsapp.dto';
import { getMessageTemplate } from './templates';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly gupshupApiUrl = process.env.GUPSHUP_API_URL;
  private readonly gupshupApiKey = process.env.GUPSHUP_API_KEY;
  private readonly businessPhoneNumber = process.env.GUPSHUP_PHONE_NUMBER;

  constructor(
    @InjectModel(WhatsappConfig.name) private whatsappConfigModel: Model<WhatsappConfig>,
    @InjectQueue('whatsapp-reminders') private reminderQueue: Queue,
  ) {}

  async sendMessage(dto: SendWhatsappDto): Promise<any> {
    try {
      const messageText = getMessageTemplate(dto.templateName, dto.language || 'en', dto.userData);
      if (!messageText) return null;
      
      const payload = {
        source: this.businessPhoneNumber,
        destination: dto.phoneNumber,
        message: messageText,
        messageType: 'TEXT',
      };

      const response = await axios.post(this.gupshupApiUrl, payload, {
        headers: { Authorization: `Bearer ${this.gupshupApiKey}`, 'Content-Type': 'application/json' },
      });

      return { success: true, messageId: response.data.messageId, phone: dto.phoneNumber };
    } catch (error) {
      this.logger.error(`Failed: ${error.message}`);
      return { success: false, error: error.message, phone: dto.phoneNumber };
    }
  }

  async sendBookingConfirmation(userPhone: string, userData: any, lang: string = 'en'): Promise<any> {
    return this.sendMessage({ phoneNumber: userPhone, templateName: 'booking-confirmation', userData, language: lang });
  }

  async sendPaymentSuccess(userPhone: string, userData: any, lang: string = 'en'): Promise<any> {
    return this.sendMessage({ phoneNumber: userPhone, templateName: 'payment-success', userData, language: lang });
  }

  async sendPaymentFailure(userPhone: string, userData: any, lang: string = 'en'): Promise<any> {
    return this.sendMessage({ phoneNumber: userPhone, templateName: 'payment-failure', userData, language: lang });
  }

  async notifyAdminBooking(details: any): Promise<any> {
    const config = await this.getWhatsappConfig();
    return this.sendMessage({ phoneNumber: config.adminPhoneNumber, templateName: 'booking-confirmation', userData: details });
  }

  async notifyAdminPayment(details: any): Promise<any> {
    const config = await this.getWhatsappConfig();
    return this.sendMessage({ phoneNumber: config.adminPhoneNumber, templateName: 'payment-success', userData: details });
  }

  async sendEventReminder(userPhone: string, userData: any, lang: string = 'en'): Promise<any> {
    return this.sendMessage({ phoneNumber: userPhone, templateName: 'event-reminder', userData, language: lang });
  }

  async scheduleReminder(bookingId: string, userPhone: string, userData: any, lang: string = 'en'): Promise<void> {
    const config = await this.getWhatsappConfig();
    const delayMs = config.reminderDelayMinutes * 60 * 1000;
    await this.reminderQueue.add({ bookingId, userPhone, userData, lang }, { delay: delayMs });
  }

  async getWhatsappConfig(): Promise<WhatsappConfig> {
    let config = await this.whatsappConfigModel.findOne();
    if (!config) {
      config = await this.whatsappConfigModel.create({
        adminPhoneNumber: process.env.ADMIN_WHATSAPP_NUMBER,
        reminderDelayMinutes: parseInt(process.env.WHATSAPP_REMINDER_DELAY_MINUTES || '1440'),
      });
    }
    return config;
  }

  async updateWhatsappConfig(updates: any): Promise<WhatsappConfig> {
    const config = await this.getWhatsappConfig();
    Object.assign(config, updates);
    return config.save();
  }
}
