import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { DonationsModule } from './modules/donations/donations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AdminModule } from './modules/admin/admin.module';
import { NotificationModule } from './modules/notification/notification.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { PredictionModule } from './modules/prediction-ai/prediction.module';
import { AttendanceModule } from './modules/attendance-ai/attendance.module';
import { ConfigEngineModule } from './modules/config-engine/config-engine.module';
import { GrievanceModule } from './modules/grievance/grievance.module';
import { EmailModule } from './modules/email/email.module';
import { BullModule } from '@nestjs/bull';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        dbName: configService.get('DB_NAME'),
      }),
    }),
    BullModule.forRoot({
      redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
    },
   }),
    WhatsappModule,
    AuthModule,
    UsersModule,
    EventsModule,
    BookingsModule,
    DonationsModule,
    PaymentsModule,
    AdminModule,
    NotificationModule,
    FeedbackModule,
    AnalyticsModule,
    CampaignModule,
    PredictionModule,
    AttendanceModule,
    ConfigEngineModule,
    GrievanceModule,
    EmailModule,
  ],
})
export class AppModule {}
