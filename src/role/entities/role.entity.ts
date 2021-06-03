import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    roleName: ROLE_NAME;
}

export enum ROLE_NAME {
    USER_LVL_1,
    USER_LVL_2
}
