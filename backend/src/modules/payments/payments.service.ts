import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private razorpay: Razorpay;

  constructor(
    @InjectModel('Payment') private paymentModel: Model<any>,
    @InjectModel('Booking') private bookingModel: Model<any>,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  // Create Razorpay Order
  async createOrder(
    userId: string,
    eventId: string,
    poojaIds: string[],
    amount: number,
  ) {
    try {
      // Validate ObjectIds
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Invalid userId');
      }
      if (!Types.ObjectId.isValid(eventId)) {
        throw new BadRequestException('Invalid eventId');
      }

      // Create Razorpay order
      const razorpayOrder = await this.razorpay.orders.create({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          userId,
          eventId,
          poojaIds: poojaIds.join(','),
        },
      });

      // Save payment record
      const payment = await this.paymentModel.create({
        userId: new Types.ObjectId(userId),
        eventId: new Types.ObjectId(eventId),
        poojaIds,
        amount,
        currency: 'INR',
        razorpayOrderId: razorpayOrder.id,
        status: 'pending',
      });

      return {
        orderId: razorpayOrder.id,
        amount,
        currency: 'INR',
        key: process.env.RAZORPAY_KEY_ID,
      };
    } catch (error) {
      console.error('Payment creation error:', error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  // Verify Payment Signature
  async verifyPayment(paymentData: any) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        paymentData;

      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

      if (expectedSignature === razorpay_signature) {
        // Update payment status
        await this.paymentModel.updateOne(
          { razorpayOrderId: razorpay_order_id },
          {
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: 'completed',
          },
        );
        return { success: true, message: 'Payment verified successfully' };
      } else {
        await this.paymentModel.updateOne(
          { razorpayOrderId: razorpay_order_id },
          { status: 'failed', failureReason: 'Invalid signature' },
        );
        return { success: false, message: 'Invalid payment signature' };
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }

  // Create booking after successful payment
  async createBooking(paymentData: any) {
    try {
      const payment = await this.paymentModel.findOne({
        razorpayOrderId: paymentData.razorpay_order_id,
      });

      if (!payment || payment.status !== 'completed') {
        throw new Error('Payment not verified');
      }

      const booking = await this.bookingModel.create({
        userId: payment.userId,
        eventId: payment.eventId,
        poojaIds: payment.poojaIds,
        paymentId: payment._id,
        amount: payment.amount,
        status: 'confirmed',
        bookingDate: new Date(),
      });

      return booking;
    } catch (error) {
      console.error('Booking creation error:', error);
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  // Get payment details
  async getPaymentDetails(orderId: string) {
    return this.paymentModel.findOne({ razorpayOrderId: orderId });
  }
}
