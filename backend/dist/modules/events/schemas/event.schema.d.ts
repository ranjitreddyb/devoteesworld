import { Document } from 'mongoose';
export declare class Pooja {
    name: string;
    durationMinutes: number;
    significance: string;
    price: number;
}
export declare class Event extends Document {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    venue: string;
    status: string;
    poojas: Pooja[];
    attendees: number;
    isActive: boolean;
    imageUrl: string;
    tags: string[];
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event> & Event & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=event.schema.d.ts.map