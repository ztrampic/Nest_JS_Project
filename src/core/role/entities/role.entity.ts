import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

import {Exclude} from "class-transformer";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    @Exclude({toPlainOnly: true})
    id: number;

    @Column({name: 'role_name'})
    roleName: string;
}


