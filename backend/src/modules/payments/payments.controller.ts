import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-order')
  @ApiOperation({ summary: 'Create Razorpay order' })
  async createOrder(
    @Body()
    body: {
      userId: string;
      eventId: string;
      poojaIds: string[];
      amount: number;
    },
  ) {
    return this.paymentsService.createOrder(
      body.userId,
      body.eventId,
      body.poojaIds,
      body.amount,
    );
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify payment signature' })
  async verifyPayment(@Body() paymentData: any) {
    const result = await this.paymentsService.verifyPayment(paymentData);
    if (result.success) {
      const booking = await this.paymentsService.createBooking(paymentData);
      return { success: true, booking };
    }
    return result;
  }

  @Post('get-details/:orderId')
  @ApiOperation({ summary: 'Get payment details' })
  async getPaymentDetails(@Param('orderId') orderId: string) {
    return this.paymentsService.getPaymentDetails(orderId);
  }
}
