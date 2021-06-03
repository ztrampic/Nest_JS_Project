import {BadRequestException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {classToPlain, plainToClass} from "class-transformer";
import {UpdateUserDto} from "./dto/update-user.dto";
import {EXCEPTION_MESSAGE} from "../../constants";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const userExist = await this.userRepository.findOne({ email: createUserDto.email });
        if(userExist){
            throw new BadRequestException(EXCEPTION_MESSAGE.USER_EXIST);
        }
        return await this.userRepository.save(plainToClass(User, createUserDto));

    }

    findAll() {
        return classToPlain(this.userRepository.find());
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id}`;
    }

    async remove(id: number) {
        const found = await this.userRepository.findOne({id: id});
        if (!found) {
            throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(id)));
        }
        return this.userRepository.delete(id);

    }

    async findById(id: number) {
        const found = await this.userRepository.findOne({ id: id });
        if(!found){
            throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(id)));
        }
        return classToPlain(found);
    }
}