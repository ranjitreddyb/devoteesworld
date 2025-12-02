import { Model } from 'mongoose';
export declare class EventsService {
    private eventModel;
    constructor(eventModel: Model<any>);
    findAll(filters?: any): Promise<any[]>;
    findById(id: string): Promise<any>;
    create(createEventDto: any): Promise<any>;
    update(id: string, updateEventDto: any): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=events.service.d.ts.map