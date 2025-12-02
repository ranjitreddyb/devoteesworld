import { ConfigService } from '@nestjs/config';
export declare class AttendanceService {
    private configService;
    constructor(configService: ConfigService);
    processEntranceFeed(videoPath: string, eventId: string): Promise<{
        eventId: string;
        detectedFaces: {
            userId: string;
            confidence: number;
            timestamp: Date;
        }[];
        totalDetected: number;
        timestamp: Date;
    }>;
    markAttendance(userId: string, eventId: string): Promise<{
        success: boolean;
        message: string;
        userId: string;
        eventId: string;
        timestamp: Date;
    }>;
    detectEarlyExits(exitVideoPath: string, eventId: string): Promise<{
        eventId: string;
        earlyExits: {
            userId: string;
            exitTime: Date;
            facePictureUrl: string;
        }[];
        notificationSent: boolean;
    }>;
}
//# sourceMappingURL=attendance-ai.service.d.ts.map