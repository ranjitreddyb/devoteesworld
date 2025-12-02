"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BookingsService = class BookingsService {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async createBooking(bookingData) {
        try {
            console.log('📝 Creating booking with data:', bookingData);
            // Validate ObjectIds
            if (!bookingData.userId) {
                throw new common_1.BadRequestException('userId is required');
            }
            if (!bookingData.eventId) {
                throw new common_1.BadRequestException('eventId is required');
            }
            if (!mongoose_2.Types.ObjectId.isValid(bookingData.userId)) {
                console.log('❌ Invalid userId format:', bookingData.userId);
                throw new common_1.BadRequestException(`Invalid userId format: ${bookingData.userId}`);
            }
            if (!mongoose_2.Types.ObjectId.isValid(bookingData.eventId)) {
                console.log('❌ Invalid eventId format:', bookingData.eventId);
                throw new common_1.BadRequestException(`Invalid eventId format: ${bookingData.eventId}`);
            }
            const booking = await this.bookingModel.create({
                userId: new mongoose_2.Types.ObjectId(bookingData.userId),
                eventId: new mongoose_2.Types.ObjectId(bookingData.eventId),
                poojaIds: bookingData.poojaIds,
                paymentId: bookingData.paymentId,
                amount: bookingData.amount,
                status: 'confirmed',
                bookingDate: new Date(),
                poojaDetails: bookingData.poojaDetails,
            });
            console.log('✅ Booking created successfully:', booking._id);
            return booking;
        }
        catch (error) {
            console.error('❌ Booking creation error:', error);
            throw new Error(`Failed to create booking: ${error.message}`);
        }
    }
    async getUserBookings(userId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(userId)) {
                throw new common_1.BadRequestException(`Invalid userId format: ${userId}`);
            }
            const bookings = await this.bookingModel
                .find({ userId: new mongoose_2.Types.ObjectId(userId) })
                .populate('eventId')
                .populate('paymentId')
                .sort({ bookingDate: -1 });
            return bookings;
        }
        catch (error) {
            throw new Error(`Failed to fetch user bookings: ${error.message}`);
        }
    }
    async getBookingDetails(bookingId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(bookingId)) {
                throw new common_1.BadRequestException(`Invalid bookingId format: ${bookingId}`);
            }
            const booking = await this.bookingModel
                .findById(new mongoose_2.Types.ObjectId(bookingId))
                .populate('eventId')
                .populate('paymentId');
            return booking;
        }
        catch (error) {
            throw new Error(`Failed to fetch booking details: ${error.message}`);
        }
    }
    async getEventBookings(eventId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(eventId)) {
                throw new common_1.BadRequestException(`Invalid eventId format: ${eventId}`);
            }
            const bookings = await this.bookingModel
                .find({ eventId: new mongoose_2.Types.ObjectId(eventId) })
                .populate('userId')
                .sort({ bookingDate: -1 });
            return bookings;
        }
        catch (error) {
            throw new Error(`Failed to fetch event bookings: ${error.message}`);
        }
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Booking')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map