"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        this.initializeEmailService();
    }
    initializeEmailService() {
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
        }
        else {
            this.logger.warn('⚠️  Email service not configured - using mock mode');
        }
    }
    async sendEmail(payload) {
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
        }
        catch (error) {
            this.logger.error(`❌ Email error: ${error.message}`);
            return false;
        }
    }
    getEmailTemplate(templateId, data) {
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
    async sendWelcomeEmail(email, name) {
        return this.sendEmail({
            to: email,
            templateId: 'welcome',
            templateData: { userName: name },
        });
    }
    async sendBookingConfirmation(email, data) {
        return this.sendEmail({
            to: email,
            templateId: 'booking_confirmation',
            templateData: data,
        });
    }
    async sendPaymentSuccess(email, data) {
        return this.sendEmail({
            to: email,
            templateId: 'payment_success',
            templateData: data,
        });
    }
    async sendPaymentFailure(email, data) {
        return this.sendEmail({
            to: email,
            templateId: 'payment_failure',
            templateData: data,
        });
    }
    async sendAdminNotification(data) {
        const adminEmail = this.configService.get('ADMIN_EMAIL') || 'admin@devoteesworld.com';
        return this.sendEmail({
            to: adminEmail,
            templateId: 'admin_notification',
            templateData: data,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map