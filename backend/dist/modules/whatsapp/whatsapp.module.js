"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mongoose_1 = require("@nestjs/mongoose");
const whatsapp_service_1 = require("./whatsapp.service");
const whatsapp_controller_1 = require("./whatsapp.controller");
const whatsapp_config_schema_1 = require("./schemas/whatsapp-config.schema");
const reminder_job_1 = require("./jobs/reminder.job");
let WhatsappModule = class WhatsappModule {
};
exports.WhatsappModule = WhatsappModule;
exports.WhatsappModule = WhatsappModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({ name: 'whatsapp-reminders' }),
            mongoose_1.MongooseModule.forFeature([{ name: whatsapp_config_schema_1.WhatsappConfig.name, schema: whatsapp_config_schema_1.WhatsappConfigSchema }]),
        ],
        providers: [whatsapp_service_1.WhatsappService, reminder_job_1.ReminderJob],
        controllers: [whatsapp_controller_1.WhatsappController],
        exports: [whatsapp_service_1.WhatsappService],
    })
], WhatsappModule);
//# sourceMappingURL=whatsapp.module.js.map