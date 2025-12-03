import { Model } from 'mongoose';
import { Event, EventDocument } from '@database/models/event.model';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private eventModel;
    constructor(eventModel: Model<EventDocument>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(createEventDto: CreateEventDto): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateEventDto: any): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
//# sourceMappingURL=events.service.d.ts.map