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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bull_1 = require("@nestjs/bull");
const axios_1 = __importDefault(require("axios"));
const whatsapp_config_schema_1 = require("./schemas/whatsapp-config.schema");
const templates_1 = require("./templates");
let WhatsappService = WhatsappService_1 = class WhatsappService {
    constructor(whatsappConfigModel, reminderQueue) {
        this.whatsappConfigModel = whatsappConfigModel;
        this.reminderQueue = reminderQueue;
        this.logger = new common_1.Logger(WhatsappService_1.name);
        this.gupshupApiUrl = process.env.GUPSHUP_API_URL;
        this.gupshupApiKey = process.env.GUPSHUP_API_KEY;
        this.businessPhoneNumber = process.env.GUPSHUP_PHONE_NUMBER;
    }
    async sendMessage(dto) {
        try {
            const messageText = (0, templates_1.getMessageTemplate)(dto.templateName, dto.language || 'en', dto.userData);
            if (!messageText)
                return null;
            const payload = {
                source: this.businessPhoneNumber,
                destination: dto.phoneNumber,
                message: messageText,
                messageType: 'TEXT',
            };
            const response = await axios_1.default.post(this.gupshupApiUrl, payload, {
                headers: { Authorization: `Bearer ${this.gupshupApiKey}`, 'Content-Type': 'application/json' },
            });
            return { success: true, messageId: response.data.messageId, phone: dto.phoneNumber };
        }
        catch (error) {
            this.logger.error(`Failed: ${error.message}`);
            return { success: false, error: error.message, phone: dto.phoneNumber };
        }
    }
    async sendBookingConfirmation(userPhone, userData, lang = 'en') {
        return this.sendMessage({ phoneNumber: userPhone, templateName: 'booking-confirmation', userData, language: lang });
    }
    async sendPaymentSuccess(userPhone, userData, lang = 'en') {
        return this.sendMessage({ phoneNumber: userPhone, templateName: 'payment-success', userData, language: lang });
    }
    async sendPaymentFailure(userPhone, userData, lang = 'en') {
        return this.sendMessage({ phoneNumber: userPhone, templateName: 'payment-failure', userData, language: lang });
    }
    async notifyAdminBooking(details) {
        const config = await this.getWhatsappConfig();
        return this.sendMessage({ phoneNumber: config.adminPhoneNumber, templateName: 'booking-confirmation', userData: details });
    }
    async notifyAdminPayment(details) {
        const config = await this.getWhatsappConfig();
        return this.sendMessage({ phoneNumber: config.adminPhoneNumber, templateName: 'payment-success', userData: details });
    }
    async sendEventReminder(userPhone, userData, lang = 'en') {
        return this.sendMessage({ phoneNumber: userPhone, templateName: 'event-reminder', userData, language: lang });
    }
    async scheduleReminder(bookingId, userPhone, userData, lang = 'en') {
        const config = await this.getWhatsappConfig();
        const delayMs = config.reminderDelayMinutes * 60 * 1000;
        await this.reminderQueue.add({ bookingId, userPhone, userData, lang }, { delay: delayMs });
    }
    async getWhatsappConfig() {
        let config = await this.whatsappConfigModel.findOne();
        if (!config) {
            config = await this.whatsappConfigModel.create({
                adminPhoneNumber: process.env.ADMIN_WHATSAPP_NUMBER,
                reminderDelayMinutes: parseInt(process.env.WHATSAPP_REMINDER_DELAY_MINUTES || '1440'),
            });
        }
        return config;
    }
    async updateWhatsappConfig(updates) {
        const config = await this.getWhatsappConfig();
        Object.assign(config, updates);
        return config.save();
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(whatsapp_config_schema_1.WhatsappConfig.name)),
    __param(1, (0, bull_1.InjectQueue)('whatsapp-reminders')),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map