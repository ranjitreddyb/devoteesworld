import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    email?: string;
    password?: string;
    name?: string;
    dateOfBirth?: Date;
    address?: string;
    phoneNumber?: string;
    maritalStatus?: string;
    dateOfMarriage?: Date;
    healthStatus?: {
        diabetic?: boolean;
        bp?: boolean;
        heartAilment?: boolean;
        recentSurgery?: boolean;
    };
    aadharCardUrl?: string;
    photoUrl?: string;
    faceVectors?: string[];
    role?: string;
    isActive?: boolean;
    location?: {
        latitude?: number;
        longitude?: number;
        region?: string;
    };
    preferredLanguage?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=user.model.d.ts.map