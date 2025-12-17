import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface EmailPayload {
  to: string;
  templateId: string;
  templateData?: Record<string, any>;
}

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);
  private transporter: any;

  constructor(private configService: ConfigService) {
    this.initializeEmailService();
  }

  private initializeEmailService() {
    const host = this.configService.get('NODEMAILER_HOST');
    const port = this.configService.get('NODEMAILER_PORT');
    const email = this.configService.get('NODEMAILER_EMAIL');
    const password = this.configService.get('NODEMAILER_PASSWORD');

    if (host && email && password) {
      this.transporter = nodemailer.createTransport({
        host,
        port: parseInt(port) || 587,
        secure: false,
        auth: {
          user: email,
          pass: password,
        },
      });
      this.logger.log('✅ Brevo email service initialized');
    } else {
      this.logger.warn('⚠️  Email service not configured - using mock mode');
    }
  }

  async sendEmail(payload: EmailPayload): Promise<boolean> {
    try {
      const isEnabled = this.configService.get('EMAILS_ENABLED') === 'true';
      if (!isEnabled) {
        this.logger.warn(`📧 Emails disabled, skipping: ${payload.to}`);
        return true;
      }

      const { subject, html } = this.getEmailTemplate(payload.templateId, payload.templateData || {});

      if (!this.transporter) {
        this.logger.log(`📧 MOCK - To: ${payload.to} | Subject: ${subject}`);
        return true;
      }

      await this.transporter.sendMail({
        from: `"DevoteeWorld" <${this.configService.get('NODEMAILER_EMAIL')}>`,
        to: payload.to,
        subject,
        html,
      });

      this.logger.log(`✅ Email sent: ${payload.to} | ${subject}`);
      return true;
    } catch (error) {
      this.logger.error(`❌ Email error: ${error.message}`);
      return false;
    }
  }

  private getEmailTemplate(
    templateId: string,
    data: any,
  ): { subject: string; html: string } {
    const templates = {
      welcome: () => ({
        subject: `Welcome to DevoteeWorld, ${data.userName}!`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #d4a574;">Welcome to DevoteeWorld! 🙏</h1>
            <p>Hi ${data.userName},</p>
            <p>Thank you for joining our spiritual community. We're excited to help you connect with meaningful devotional experiences.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Explore upcoming events and poojas</li>
              <li>Book your first spiritual experience</li>
              <li>Connect with our community</li>
            </ul>
            <p>Best regards,<br><strong>DevoteeWorld Team</strong></p>
          </div>
        `,
      }),
      booking_confirmation: () => ({
        subject: `Booking Confirmed - ${data.eventName} 🙏`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #d4a574;">Your Booking is Confirmed!</h1>
            <p>Hi ${data.userName},</p>
            <p>Your booking for <strong>${data.eventName}</strong> has been successfully confirmed.</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>📅 Date:</strong> ${data.eventDate}</p>
              <p><strong>⏰ Time:</strong> ${data.eventTime}</p>
              <p><strong>📍 Location:</strong> ${data.eventLocation}</p>
              <p><strong>🙏 Poojas:</strong> ${data.poojaIds?.join(', ') || 'Selected'}</p>
              <p><strong>💰 Amount:</strong> ₹${data.amount}</p>
              <p><strong>📋 Booking ID:</strong> ${data.bookingId}</p>
            </div>
            <p>We look forward to seeing you there!</p>
            <p>Best regards,<br><strong>DevoteeWorld Team</strong></p>
          </div>
        `,
      }),
      payment_success: () => ({
        subject: `Payment Successful - ₹${data.amount} ✅`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #28a745;">Payment Successful! ✅</h1>
            <p>Hi ${data.userName},</p>
            <p>Your payment has been successfully processed.</p>
            <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>💰 Amount Paid:</strong> ₹${data.amount}</p>
              <p><strong>🔐 Transaction ID:</strong> ${data.transactionId}</p>
              <p><strong>📋 Booking ID:</strong> ${data.bookingId}</p>
              <p><strong>📅 Date & Time:</strong> ${data.timestamp}</p>
            </div>
            <p>Your booking is now confirmed and paid. You'll receive further details closer to the event date.</p>
            <p>Best regards,<br><strong>DevoteeWorld Team</strong></p>
          </div>
        `,
      }),
      payment_failure: () => ({
        subject: `Payment Retry Required ⚠️`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #dc3545;">Payment Failed ⚠️</h1>
            <p>Hi ${data.userName},</p>
            <p>Unfortunately, your payment could not be processed.</p>
            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Reason:</strong> ${data.failureReason || 'Transaction declined'}</p>
              <p><strong>Amount:</strong> ₹${data.amount}</p>
            </div>
            <p>Please try again with a different payment method or contact our support team.</p>
            <p>Best regards,<br><strong>DevoteeWorld Team</strong></p>
          </div>
        `,
      }),
      admin_notification: () => ({
        subject: `New Booking - ${data.eventName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>New Booking Received</h1>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              <p><strong>User:</strong> ${data.userName}</p>
              <p><strong>Email:</strong> ${data.userEmail}</p>
              <p><strong>Event:</strong> ${data.eventName}</p>
              <p><strong>Amount:</strong> ₹${data.amount}</p>
              <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            </div>
          </div>
        `,
      }),
    };

    const template = templates[templateId] || templates.welcome;
    return template();
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      templateId: 'welcome',
      templateData: { userName: name },
    });
  }

  async sendBookingConfirmation(email: string, data: any): Promise<boolean> {
    return this.sendEmail({
      to: email,
      templateId: 'booking_confirmation',
      templateData: data,
    });
  }

  async sendPaymentSuccess(email: string, data: any): Promise<boolean> {
    return this.sendEmail({
      to: email,
      templateId: 'payment_success',
      templateData: data,
    });
  }

  async sendPaymentFailure(email: string, data: any): Promise<boolean> {
    return this.sendEmail({
      to: email,
      templateId: 'payment_failure',
      templateData: data,
    });
  }

  async sendAdminNotification(data: any): Promise<boolean> {
    const adminEmail = this.configService.get('ADMIN_EMAIL') || 'admin@devoteesworld.com';
    return this.sendEmail({
      to: adminEmail,
      templateId: 'admin_notification',
      templateData: data,
    });
  }
}
