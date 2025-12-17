import { Injectable, Logger } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { WhatsappService } from '../whatsapp.service';

@Processor('whatsapp-reminders')
@Injectable()
export class ReminderJob {
  private readonly logger = new Logger(ReminderJob.name);
  constructor(private whatsappService: WhatsappService) {}
  
  @Process()
  async handleReminder(job: Job): Promise<void> {
    const { bookingId, userPhone, userData, lang } = job.data;
    this.logger.log(`Sending reminder for: ${bookingId}`);
    await this.whatsappService.sendEventReminder(userPhone, userData, lang);
  }
}
