import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from "../auth.service";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {EXCEPTION_MESSAGE} from "../../../../constants";
import {JwtPayload} from "../helpers/auth.helper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.SECRETKEY}`,
        });
    }

    //Not for JWT strategy
    async validate(payload: JwtPayload) {
        const {email} = payload;
        const user = await this.authService.validateUser(email);
        if (!user) {
            throw new HttpException(EXCEPTION_MESSAGE.WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}