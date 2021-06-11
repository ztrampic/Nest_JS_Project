
import { User } from "./src/core/user/entities/user.entity";
import { Role } from "./src/core/role/entities/role.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";

const ENTITIES : any[] = [
    User,Role
]

export class TypeOrmConfig{
    static getOrmConfig(configService: ConfigService) :any {
        return {
            type: configService.get('DB_TYPE'),
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            synchronize: true,
            logging: true,
            entities: ENTITIES,
        }
    }
}

export const asyncTypeOrmConfig = {
    imports:[ConfigModule],
    useFactory : async (configService: ConfigService) => TypeOrmConfig.getOrmConfig(configService),
    inject:[ConfigService]
}
