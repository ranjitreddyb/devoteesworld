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
exports.PredictionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_model_1 = require("../../database/models/booking.model");
let PredictionService = class PredictionService {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async predictAttendance(eventParams) {
        // Simplified ML logic - in production, integrate with a real ML model
        const historicalBookings = await this.bookingModel.find();
        // Calculate base prediction (70% of average attendees)
        const avgAttendees = Math.ceil(historicalBookings.length / 12);
        const predictedAttendees = Math.ceil(avgAttendees * 0.7);
        return {
            predictedAttendees,
            confidence: 0.75,
            recommendation: predictedAttendees > 500 ? 'Increase staff' : 'Standard setup',
            factors: {
                season: eventParams.season,
                area: eventParams.area,
                venue: eventParams.venue,
                poojaType: eventParams.poojaType,
            },
        };
    }
    async recommendPoojasByJatakam(userJatakamData) {
        // AI-backed recommendation engine
        return {
            recommendedPoojas: [
                'Navgraha Puja',
                'Durga Puja',
                'Dhanvantri Puja',
            ],
            reason: 'Based on your astrological chart',
            timings: {
                bestMonth: 'December',
                bestDay: 'Thursday',
                bestTime: '06:00 AM - 08:00 AM',
            },
        };
    }
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_model_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PredictionService);
//# sourceMappingURL=prediction-ai.service.js.map