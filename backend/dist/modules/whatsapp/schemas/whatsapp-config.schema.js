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
exports.WhatsappConfigSchema = exports.WhatsappConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WhatsappConfig = class WhatsappConfig extends mongoose_2.Document {
};
exports.WhatsappConfig = WhatsappConfig;
__decorate([
    (0, mongoose_1.Prop)({ required: true, match: /^\+91[0-9]{10}$/ }),
    __metadata("design:type", String)
], WhatsappConfig.prototype, "adminPhoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 1440, min: 60, max: 1440 }),
    __metadata("design:type", Number)
], WhatsappConfig.prototype, "reminderDelayMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            bookingConfirmation: Boolean,
            paymentSuccess: Boolean,
            paymentFailure: Boolean,
            adminAlert: Boolean,
            eventReminder: Boolean,
        },
        default: {
            bookingConfirmation: true,
            paymentSuccess: true,
            paymentFailure: true,
            adminAlert: true,
            eventReminder: true,
        },
    }),
    __metadata("design:type", Object)
], WhatsappConfig.prototype, "enabledNotifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: ['en', 'hi', 'ta', 'te', 'ka', 'ml', 'gu', 'mr'] }),
    __metadata("design:type", Array)
], WhatsappConfig.prototype, "supportedLanguages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], WhatsappConfig.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], WhatsappConfig.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], WhatsappConfig.prototype, "updatedBy", void 0);
exports.WhatsappConfig = WhatsappConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WhatsappConfig);
exports.WhatsappConfigSchema = mongoose_1.SchemaFactory.createForClass(WhatsappConfig);
//# sourceMappingURL=whatsapp-config.schema.js.map