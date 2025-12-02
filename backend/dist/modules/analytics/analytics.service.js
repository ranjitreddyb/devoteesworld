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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_model_1 = require("../../database/models/booking.model");
let AnalyticsService = class AnalyticsService {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async getDailyAnalytics(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const bookings = await this.bookingModel.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
        return {
            totalAttendees: bookings.length,
            confirmedBookings: bookings.filter((b) => b.status === 'confirmed').length,
            totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
            bookings,
        };
    }
    async getOverallAnalytics() {
        const allBookings = await this.bookingModel.find().populate('userId').populate('eventId');
        const genderWise = {};
        const poojaWise = {};
        const regionWise = {};
        allBookings.forEach((booking) => {
            // Aggregate by gender, pooja, region
        });
        return {
            totalAttendees: allBookings.length,
            totalRevenue: allBookings.reduce((sum, b) => sum + b.totalAmount, 0),
            genderWise,
            poojaWise,
            regionWise,
        };
    }
    async getCostAnalysis(eventId) {
        return {
            estimatedCost: 50000,
            actualCost: 45000,
            variance: 5000,
            breakdown: {
                ritvik: 10000,
                items: 15000,
                food: 20000,
            },
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_model_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map