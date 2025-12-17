import { WhatsappService } from './whatsapp.service';
import { SendWhatsappDto } from './dto/send-whatsapp.dto';
export declare class WhatsappController {
    private whatsappService;
    constructor(whatsappService: WhatsappService);
    sendTestMessage(dto: SendWhatsappDto): Promise<any>;
    getConfig(): Promise<import("./schemas/whatsapp-config.schema").WhatsappConfig>;
    updateConfig(updates: any): Promise<import("./schemas/whatsapp-config.schema").WhatsappConfig>;
    handleWebhook(payload: any): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=whatsapp.controller.d.ts.map