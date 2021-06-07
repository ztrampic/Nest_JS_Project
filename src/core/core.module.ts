import { Module } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {RoleModule} from "./role/role.module";
import { AuthModule } from './auth/auth.module';

const modules : any = [
    UserModule,
    RoleModule,
    AuthModule,
]

@Module({
    imports: [
        ...modules,
    ],
})
export class CoreModule {}
