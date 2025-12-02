import { Model } from 'mongoose';
import { BookingDocument } from '@database/models/booking.model';
export declare class PredictionService {
    private bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    predictAttendance(eventParams: {
        season: string;
        area: string;
        venue: string;
        poojaType: string;
    }): Promise<{
        predictedAttendees: number;
        confidence: number;
        recommendation: string;
        factors: {
            season: string;
            area: string;
            venue: string;
            poojaType: string;
        };
    }>;
    recommendPoojasByJatakam(userJatakamData: any): Promise<{
        recommendedPoojas: string[];
        reason: string;
        timings: {
            bestMonth: string;
            bestDay: string;
            bestTime: string;
        };
    }>;
}
//# sourceMappingURL=prediction-ai.service.d.ts.map