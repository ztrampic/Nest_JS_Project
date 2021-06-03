import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    BaseEntity, BeforeInsert
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Role} from "../../role/entities/role.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: true, unique: false})
    name: string;

    @Column({type: 'varchar', nullable: true, unique: false})
    lastname: number;

    @Column({type: 'varchar', nullable: false, unique: false})
    password: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    username: string;

    @Column({type: 'varchar', nullable: false})
    email: string;

    @Column({default: true})
    isActive: boolean;

    @ManyToMany(() => Role, {eager: false, cascade: true})
    @JoinTable()
    roles: Role[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}