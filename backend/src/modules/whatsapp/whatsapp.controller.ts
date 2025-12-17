import { Controller, Post, Get, Put, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SendWhatsappDto } from './dto/send-whatsapp.dto';

@Controller('api/v1/whatsapp')
export class WhatsappController {
  constructor(private whatsappService: WhatsappService) {}

  @Post('test')
  async sendTestMessage(@Body() dto: SendWhatsappDto) {
    return this.whatsappService.sendMessage(dto);
  }

  @Get('config')
  async getConfig() {
    return this.whatsappService.getWhatsappConfig();
  }

  @Put('config')
  async updateConfig(@Body() updates: any) {
    return this.whatsappService.updateWhatsappConfig(updates);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    console.log('Webhook:', payload);
    return { success: true };
  }
}
