import * as bcrypt from 'bcrypt';
import {SetMetadata} from '@nestjs/common';
import {IS_PUBLIC_KEY} from "../../../../constants";

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface JwtPayload {
    email: string;
}

export interface LoginStatus {
    email: string;
    accessToken: any;
    expiresIn: any;
}

export const comparePasswords = async (userPassword, currentPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};

export const OpenPublic = () => SetMetadata(IS_PUBLIC_KEY, true);