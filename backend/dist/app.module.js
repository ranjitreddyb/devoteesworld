"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const events_module_1 = require("./modules/events/events.module");
const bookings_module_1 = require("./modules/bookings/bookings.module");
const donations_module_1 = require("./modules/donations/donations.module");
const payments_module_1 = require("./modules/payments/payments.module");
const admin_module_1 = require("./modules/admin/admin.module");
const notification_module_1 = require("./modules/notification/notification.module");
const feedback_module_1 = require("./modules/feedback/feedback.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const campaign_module_1 = require("./modules/campaign/campaign.module");
const prediction_module_1 = require("./modules/prediction-ai/prediction.module");
const attendance_module_1 = require("./modules/attendance-ai/attendance.module");
const config_engine_module_1 = require("./modules/config-engine/config-engine.module");
const grievance_module_1 = require("./modules/grievance/grievance.module");
const email_module_1 = require("./modules/email/email.module");
const bull_1 = require("@nestjs/bull");
const whatsapp_module_1 = require("./modules/whatsapp/whatsapp.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                    dbName: configService.get('DB_NAME'),
                }),
            }),
            bull_1.BullModule.forRoot({
                redis: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT) || 6379,
                },
            }),
            whatsapp_module_1.WhatsappModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            events_module_1.EventsModule,
            bookings_module_1.BookingsModule,
            donations_module_1.DonationsModule,
            payments_module_1.PaymentsModule,
            admin_module_1.AdminModule,
            notification_module_1.NotificationModule,
            feedback_module_1.FeedbackModule,
            analytics_module_1.AnalyticsModule,
            campaign_module_1.CampaignModule,
            prediction_module_1.PredictionModule,
            attendance_module_1.AttendanceModule,
            config_engine_module_1.ConfigEngineModule,
            grievance_module_1.GrievanceModule,
            email_module_1.EmailModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map