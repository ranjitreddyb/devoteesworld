"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto = __importStar(require("crypto"));
let PaymentsService = class PaymentsService {
    constructor(paymentModel, bookingModel) {
        this.paymentModel = paymentModel;
        this.bookingModel = bookingModel;
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    // Create Razorpay Order
    async createOrder(userId, eventId, poojaIds, amount) {
        try {
            // Validate ObjectIds
            if (!mongoose_2.Types.ObjectId.isValid(userId)) {
                throw new common_1.BadRequestException('Invalid userId');
            }
            if (!mongoose_2.Types.ObjectId.isValid(eventId)) {
                throw new common_1.BadRequestException('Invalid eventId');
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
                userId: new mongoose_2.Types.ObjectId(userId),
                eventId: new mongoose_2.Types.ObjectId(eventId),
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
        }
        catch (error) {
            console.error('❌ Payment creation error:', error);
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }
    // Verify Payment Signature
    async verifyPayment(paymentData) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
            console.log('🔐 Verifying payment:', { razorpay_order_id, razorpay_payment_id });
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(body)
                .digest('hex');
            if (expectedSignature === razorpay_signature) {
                console.log('✅ Payment signature verified');
                // Update payment status
                await this.paymentModel.updateOne({ razorpayOrderId: razorpay_order_id }, {
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    status: 'completed',
                });
                return { success: true, message: 'Payment verified successfully' };
            }
            else {
                console.error('❌ Payment signature mismatch');
                await this.paymentModel.updateOne({ razorpayOrderId: razorpay_order_id }, { status: 'failed', failureReason: 'Invalid signature' });
                return { success: false, message: 'Invalid payment signature' };
            }
        }
        catch (error) {
            console.error('❌ Payment verification error:', error);
            throw new Error(`Payment verification failed: ${error.message}`);
        }
    }
    // Get payment record by order ID
    async getPaymentByOrderId(orderId) {
        try {
            const payment = await this.paymentModel.findOne({
                razorpayOrderId: orderId,
            }).lean();
            return payment;
        }
        catch (error) {
            console.error('❌ Error fetching payment by order ID:', error);
            return null;
        }
    }
    // Create booking after successful payment
    async createBooking(paymentData) {
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
        }
        catch (error) {
            console.error('❌ Booking creation error:', error);
            throw new Error(`Failed to create booking: ${error.message}`);
        }
    }
    // Get payment details
    async getPaymentDetails(orderId) {
        return this.paymentModel.findOne({ razorpayOrderId: orderId });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Payment')),
    __param(1, (0, mongoose_1.InjectModel)('Booking')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map