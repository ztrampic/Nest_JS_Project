import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {classToPlain, plainToClass} from "class-transformer";
import {UpdateUserDto} from "./dto/update-user.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    create(createUserDto: CreateUserDto) {
        let user: User = plainToClass(User, createUserDto);
        this.userRepository.insert(user);
    }

    findAll() {
        return classToPlain(this.userRepository.find());
    }

    findOne(id: number) {
        return this.userRepository.findByIds([id]);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id}`;
    }

    remove(id: number) {
        this.userRepository.delete(id).then(r => {
            console.log("R", r);
            console.log("DELETED USER WITH ID".concat(id.toString()));
        });
    }
}