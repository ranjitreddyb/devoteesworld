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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AttendanceService = class AttendanceService {
    constructor(configService) {
        this.configService = configService;
    }
    async processEntranceFeed(videoPath, eventId) {
        // Placeholder for YOLOv8 + FAISS integration
        // In production, integrate with actual face recognition models
        return {
            eventId,
            detectedFaces: [
                { userId: 'user1', confidence: 0.95, timestamp: new Date() },
                { userId: 'user2', confidence: 0.92, timestamp: new Date() },
            ],
            totalDetected: 2,
            timestamp: new Date(),
        };
    }
    async markAttendance(userId, eventId) {
        return {
            success: true,
            message: 'Attendance marked',
            userId,
            eventId,
            timestamp: new Date(),
        };
    }
    async detectEarlyExits(exitVideoPath, eventId) {
        // Logic to detect who left early
        return {
            eventId,
            earlyExits: [
                { userId: 'user1', exitTime: new Date(), facePictureUrl: 'url' },
            ],
            notificationSent: true,
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AttendanceService);
//# sourceMappingURL=attendance-ai.service.js.map