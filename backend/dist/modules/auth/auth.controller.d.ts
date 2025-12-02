import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            phoneNumber: any;
            role: any;
        };
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
//# sourceMappingURL=auth.controller.d.ts.map