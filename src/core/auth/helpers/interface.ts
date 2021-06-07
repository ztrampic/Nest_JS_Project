import * as bcrypt from 'bcrypt';

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface JwtPayload {
    username: string;
}

export interface LoginStatus {
    username: string;
    accessToken: any;
    expiresIn: any;
}

export const comparePasswords = async (userPassword, currentPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};