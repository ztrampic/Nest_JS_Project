import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";

const modules: any = [
    UserModule,
    JwtModule.register({
        secret: "None",
        signOptions: {expiresIn: '60s'},
    }),
]

@Module({
    imports: [
        ...modules,
    ],
    providers: [AuthService]
})
export class AuthModule {
}
