
import { User } from "./src/user/entities/user.entity";
import { Role } from "./src/role/entities/role.entity";
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