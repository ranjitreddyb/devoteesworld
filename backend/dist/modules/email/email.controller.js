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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const email_service_1 = require("./email.service");
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async sendTest(body) {
        const result = await this.emailService.sendWelcomeEmail(body.email, body.name || 'Test User');
        return {
            success: result,
            message: result ? 'Test email sent successfully' : 'Failed to send test email',
            email: body.email,
        };
    }
    async sendBookingConfirmation(bookingData) {
        const result = await this.emailService.sendBookingConfirmation(bookingData.email, bookingData);
        return {
            success: result,
            message: result ? 'Booking confirmation sent' : 'Failed to send email',
        };
    }
    async sendPaymentSuccess(paymentData) {
        const result = await this.emailService.sendPaymentSuccess(paymentData.email, paymentData);
        return {
            success: result,
            message: result ? 'Payment success email sent' : 'Failed to send email',
        };
    }
    async getStatus() {
        return {
            status: 'operational',
            message: 'Email service is running',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Send test email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendTest", null);
__decorate([
    (0, common_1.Post)('booking-confirmation'),
    (0, swagger_1.ApiOperation)({ summary: 'Send booking confirmation email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendBookingConfirmation", null);
__decorate([
    (0, common_1.Post)('payment-success'),
    (0, swagger_1.ApiOperation)({ summary: 'Send payment success email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendPaymentSuccess", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: 'Check email service status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getStatus", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('Email'),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map