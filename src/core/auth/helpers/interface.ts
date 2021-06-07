import * as bcrypt from 'bcrypt';

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