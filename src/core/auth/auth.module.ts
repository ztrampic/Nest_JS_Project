import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";

const modules: any = [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
        secret: `${process.env.SECRETKEY}`,
        signOptions: {expiresIn: '20s'},
    }),
]

@Module({
    imports: [
        ...modules,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
