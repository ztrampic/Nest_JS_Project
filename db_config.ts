
import { User } from "./src/core/user/entities/user.entity";
import { Role } from "./src/core/role/entities/role.entity";
const ENTITIES : any[] = [
    User,Role
]

export const DB_CONFIG : any = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'zare',
    database: 'nest_js',
    synchronize: true,
    entities: ENTITIES,
}