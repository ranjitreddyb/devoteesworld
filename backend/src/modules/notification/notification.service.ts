import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private twilioClient: any;

  constructor(private configService: ConfigService) {
    this.initializeTwilio();
  }

  private initializeTwilio() {
    try {
      const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
      const authToken = this.configService.get('TWILIO_AUTH_TOKEN');

      if (accountSid?.trim() && authToken?.trim() && accountSid.startsWith('AC')) {
        const twilio = require('twilio');
        this.twilioClient = twilio(accountSid, authToken);
        console.log('✅ Twilio initialized');
      } else {
        console.warn('⚠️  Twilio not configured');
        this.twilioClient = null;
      }
    } catch (error: any) {
      console.warn('⚠️  Twilio init failed:', error.message);
      this.twilioClient = null;
    }
  }

  async sendEmail(to: string, subject: string, text: string) {
    console.log(`📧 Email to ${to}: ${subject}`);
    return { success: true };
  }

  async sendSMS(phoneNumber: string, message: string) {
    if (!this.twilioClient) return { success: false };
    try {
      return await this.twilioClient.messages.create({
        body: message,
        from: this.configService.get('TWILIO_PHONE_NUMBER'),
        to: phoneNumber,
      });
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async sendWhatsApp(phoneNumber: string, message: string) {
    if (!this.twilioClient) return { success: false };
    try {
      return await this.twilioClient.messages.create({
        body: message,
        from: `whatsapp:${this.configService.get('TWILIO_PHONE_NUMBER')}`,
        to: `whatsapp:${phoneNumber}`,
      });
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
