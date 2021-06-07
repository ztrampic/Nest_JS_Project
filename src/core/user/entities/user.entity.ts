import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    BaseEntity, BeforeInsert, BeforeUpdate
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Role} from "../../role/entities/role.entity";
import {Exclude} from "class-transformer";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: true, unique: false})
    name: string;

    @Column({type: 'varchar', nullable: true, unique: false})
    lastname: number;

    @Column({type: 'varchar', nullable: false, unique: false})
    @Exclude({toPlainOnly: true})
    password: string;

    @Column({type: 'varchar', nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({default: true, name: 'is_active'})
    isActive: boolean;

    @ManyToMany(() => Role, {eager: true})
    @JoinTable({
        name: 'user_role',
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'role_id', referencedColumnName: 'id'},
    })
    roles: Role[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}