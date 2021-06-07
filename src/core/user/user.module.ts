import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {RoleModule} from "../role/role.module";

const modules: any = [
    RoleModule
]

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ...modules
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {
}