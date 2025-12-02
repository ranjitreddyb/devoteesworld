import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../database/models/user.model").UserDocument> & import("../../database/models/user.model").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../database/models/user.model").UserDocument> & import("../../database/models/user.model").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: string, updateData: any): Promise<import("mongoose").Document<unknown, {}, import("../../database/models/user.model").UserDocument> & import("../../database/models/user.model").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map