import { Job } from 'bull';
import { WhatsappService } from '../whatsapp.service';
export declare class ReminderJob {
    private whatsappService;
    private readonly logger;
    constructor(whatsappService: WhatsappService);
    handleReminder(job: Job): Promise<void>;
}
//# sourceMappingURL=reminder.job.d.ts.map