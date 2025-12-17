import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private emailService;
    constructor(usersService: UsersService, jwtService: JwtService, emailService: EmailService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
            phoneNumber: string;
            whatsappNumber: string;
            language: string;
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
            whatsappNumber: any;
            language: any;
            role: any;
        };
    }>;
    loginDirect(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
            phoneNumber: string;
            whatsappNumber: string;
            language: string;
            role: string;
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
            whatsappNumber: string;
            language: string;
            role: string;
        };
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map