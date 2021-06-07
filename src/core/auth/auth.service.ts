import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {JwtPayload, LoginStatus, RegistrationStatus} from "./helpers/interface";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {User} from "../user/entities/user.entity";
import {EXCEPTION_MESSAGE, SUCCESS_MESSAGE} from "../../../constants";
import {CreateUserDto} from "../user/dto/create-user.dto";


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {
    }

    async register(createUserDto: CreateUserDto) {
        let status: RegistrationStatus = {success: true, message: SUCCESS_MESSAGE.USER_REGISTER};
        try {
            await this.usersService.create(createUserDto);
        } catch (err) {
            status = {success: false, message: err};
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.usersService.loginUser(loginUserDto);
        const token = this._createToken(user);
        return {email: user.email, ...token};
    }

    private _createToken({email}: User) {
        const expiresIn = `${process.env.EXPIRESIN}`;
        const user: JwtPayload = {email};
        const accessToken = this.jwtService.sign(user);
        return {expiresIn, accessToken};
    }

    async validateUser(payload: JwtPayload) {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException(EXCEPTION_MESSAGE.WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

}



