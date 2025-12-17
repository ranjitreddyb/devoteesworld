import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappConfig, WhatsappConfigSchema } from './schemas/whatsapp-config.schema';
import { ReminderJob } from './jobs/reminder.job';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'whatsapp-reminders' }),
    MongooseModule.forFeature([{ name: WhatsappConfig.name, schema: WhatsappConfigSchema }]),
  ],
  providers: [WhatsappService, ReminderJob],
  controllers: [WhatsappController],
  exports: [WhatsappService],
})
export class WhatsappModule {}
