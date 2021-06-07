import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {AuthService} from "./auth.service";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {User} from "../user/entities/user.entity";
import {EXCEPTION_MESSAGE} from "../../../constants";
import {JwtPayload} from "./helpers/interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.SECRETKEY}`,
        });
    }

    async validate(payload: JwtPayload){
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException(EXCEPTION_MESSAGE.WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}