import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
            phoneNumber: string;
            role: string;
        };
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            phoneNumber: any;
            role: any;
        };
    }>;
    validateUser(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, import("../../database/models/user.model").UserDocument> & import("../../database/models/user.model").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    registerGuest(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
            phoneNumber: string;
            role: string;
        };
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map