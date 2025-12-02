import { EventsService } from './events.service';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(filters: any): Promise<any[]>;
    findById(id: string): Promise<any>;
    create(createEventDto: any): Promise<any>;
    update(id: string, updateEventDto: any): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=events.controller.d.ts.map