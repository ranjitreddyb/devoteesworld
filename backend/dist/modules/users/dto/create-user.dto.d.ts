declare class HealthStatusDto {
    diabetic: boolean;
    bp: boolean;
    heartAilment: boolean;
    recentSurgery: boolean;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    maritalStatus: string;
    dateOfMarriage?: Date;
    healthStatus: HealthStatusDto;
    aadharCardUrl?: string;
    photoUrl?: string;
}
export {};
//# sourceMappingURL=create-user.dto.d.ts.map