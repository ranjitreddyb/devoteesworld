import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('test')
  @ApiOperation({ summary: 'Send test email' })
  async sendTest(@Body() body: { email: string; name?: string }) {
    const result = await this.emailService.sendWelcomeEmail(
      body.email,
      body.name || 'Test User',
    );
    return {
      success: result,
      message: result ? 'Test email sent successfully' : 'Failed to send test email',
      email: body.email,
    };
  }

  @Post('booking-confirmation')
  @ApiOperation({ summary: 'Send booking confirmation email' })
  async sendBookingConfirmation(@Body() bookingData: any) {
    const result = await this.emailService.sendBookingConfirmation(
      bookingData.email,
      bookingData,
    );
    return {
      success: result,
      message: result ? 'Booking confirmation sent' : 'Failed to send email',
    };
  }

  @Post('payment-success')
  @ApiOperation({ summary: 'Send payment success email' })
  async sendPaymentSuccess(@Body() paymentData: any) {
    const result = await this.emailService.sendPaymentSuccess(
      paymentData.email,
      paymentData,
    );
    return {
      success: result,
      message: result ? 'Payment success email sent' : 'Failed to send email',
    };
  }

  @Get('status')
  @ApiOperation({ summary: 'Check email service status' })
  async getStatus() {
    return {
      status: 'operational',
      message: 'Email service is running',
      timestamp: new Date().toISOString(),
    };
  }
}
