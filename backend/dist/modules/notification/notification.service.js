"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let NotificationService = class NotificationService {
    constructor(configService) {
        this.configService = configService;
        this.initializeTwilio();
    }
    initializeTwilio() {
        try {
            const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
            const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
            if (accountSid?.trim() && authToken?.trim() && accountSid.startsWith('AC')) {
                const twilio = require('twilio');
                this.twilioClient = twilio(accountSid, authToken);
                console.log('✅ Twilio initialized');
            }
            else {
                console.warn('⚠️  Twilio not configured');
                this.twilioClient = null;
            }
        }
        catch (error) {
            console.warn('⚠️  Twilio init failed:', error.message);
            this.twilioClient = null;
        }
    }
    async sendEmail(to, subject, text) {
        console.log(`📧 Email to ${to}: ${subject}`);
        return { success: true };
    }
    async sendSMS(phoneNumber, message) {
        if (!this.twilioClient)
            return { success: false };
        try {
            return await this.twilioClient.messages.create({
                body: message,
                from: this.configService.get('TWILIO_PHONE_NUMBER'),
                to: phoneNumber,
            });
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async sendWhatsApp(phoneNumber, message) {
        if (!this.twilioClient)
            return { success: false };
        try {
            return await this.twilioClient.messages.create({
                body: message,
                from: `whatsapp:${this.configService.get('TWILIO_PHONE_NUMBER')}`,
                to: `whatsapp:${phoneNumber}`,
            });
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map