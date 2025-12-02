import { Document, Types } from 'mongoose';
export type EventDocument = Event & Document;
export declare class Pooja {
    name: string;
    durationMinutes: number;
    attire: string;
    itemsToBring: string[];
    significance: string;
    priests: Types.ObjectId[];
    price: number;
}
export declare class Event {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    venue: string;
    latitude: number;
    longitude: number;
    poojas: Pooja[];
    celebrityAttendees: Types.ObjectId[];
    status: string;
    totalAttendees: number;
    maxAttendees: number;
    organizer: Types.ObjectId;
    dailySignificance: {
        date: Date;
        significanceText: string;
        muhurtams: string;
        recommendedPoojas: string[];
    };
    isActive: boolean;
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event> & Event & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=event.model.d.ts.map