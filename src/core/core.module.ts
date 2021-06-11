import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {RoleModule} from "./role/role.module";
import {AuthModule} from './auth/auth.module';
import {UserService} from "./user/user.service";
import {AuthService} from "./auth/auth.service";

const modules: any = [
    UserModule,
    RoleModule,
    AuthModule,
]

@Module({
    imports: [...modules],
    providers: [...modules],
    exports: [...modules]
})
export class CoreModule {
}
