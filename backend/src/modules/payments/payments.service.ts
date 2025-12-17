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

      console.log('💳 Creating Razorpay order:', { userId, eventId, amount });

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

      console.log('✅ Razorpay order created:', razorpayOrder.id);

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

      // ✅ Return with order_id (snake_case) so frontend can read it
      return {
        order_id: razorpayOrder.id,
        amount,
        currency: 'INR',
        key: process.env.RAZORPAY_KEY_ID,
      };
    } catch (error: any) {
      console.error('❌ Payment creation error:', error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  // Verify Payment Signature
  async verifyPayment(paymentData: any) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        paymentData;

      console.log('🔐 Verifying payment:', { razorpay_order_id, razorpay_payment_id });

      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

      if (expectedSignature === razorpay_signature) {
        console.log('✅ Payment signature verified');
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
        console.error('❌ Payment signature mismatch');
        await this.paymentModel.updateOne(
          { razorpayOrderId: razorpay_order_id },
          { status: 'failed', failureReason: 'Invalid signature' },
        );
        return { success: false, message: 'Invalid payment signature' };
      }
    } catch (error: any) {
      console.error('❌ Payment verification error:', error);
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }

  // Get payment record by order ID
  async getPaymentByOrderId(orderId: string) {
    try {
      const payment = await this.paymentModel.findOne({
        razorpayOrderId: orderId,
      }).lean();
      return payment;
    } catch (error: any) {
      console.error('❌ Error fetching payment by order ID:', error);
      return null;
    }
  }

  // Create booking after successful payment
  async createBooking(paymentData: any) {
    try {
      console.log('📋 Creating booking from payment:', paymentData);

      // Ensure we have all required fields
      if (!paymentData.userId || !paymentData.eventId || !paymentData.totalAmount) {
        throw new Error('Missing required payment data: userId, eventId, or totalAmount');
      }

      const booking = await this.bookingModel.create({
        userId: paymentData.userId,
        eventId: paymentData.eventId,
        poojaIds: paymentData.poojaIds || [],
        razorpayOrderId: paymentData.razorpay_order_id,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        totalAmount: paymentData.totalAmount,
        status: 'confirmed',
        bookingDate: new Date(),
      });

      console.log('✅ Booking created:', booking._id);
      return booking;
    } catch (error: any) {
      console.error('❌ Booking creation error:', error);
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  // Get payment details
  async getPaymentDetails(orderId: string) {
    return this.paymentModel.findOne({ razorpayOrderId: orderId });
  }
}
