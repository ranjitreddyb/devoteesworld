import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../database/models/event.model").EventDocument> & import("../../database/models/event.model").Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../database/models/event.model").EventDocument> & import("../../database/models/event.model").Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(createEventDto: CreateEventDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../../database/models/event.model").EventDocument> & import("../../database/models/event.model").Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateEventDto: any, req: any): Promise<import("mongoose").Document<unknown, {}, import("../../database/models/event.model").EventDocument> & import("../../database/models/event.model").Event & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=events.controller.d.ts.map