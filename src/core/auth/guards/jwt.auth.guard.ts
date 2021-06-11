import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../../../../constants";
import {AuthService} from "../auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflect: Reflector, private authService: AuthService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflect.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        } else if (!isPublic) {
            const req = context.switchToHttp().getRequest();
            const token = req.headers.authorization;
            return this.authService.isTokenValid(token ? token.split(' ')[1] : null);
        }
        return super.canActivate(context);
    }
}