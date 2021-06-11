import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {classToPlain, plainToClass} from "class-transformer";
import {UpdateUserDto} from "./dto/update-user.dto";
import {EXCEPTION_MESSAGE, ROLES} from "../../../constants";
import {Role} from "../role/entities/role.entity";
import {CreateRoleDto} from "../role/dto/create-role.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {comparePasswords, JwtPayload} from "../auth/helpers/auth.helper";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const userExist = await this.userRepository.findOne({email: createUserDto.email});
        if (userExist) {
            throw new HttpException(EXCEPTION_MESSAGE.USER_EXIST, HttpStatus.BAD_REQUEST);
        }
        if (createUserDto.roles && createUserDto.roles.length > 0) {
            createUserDto.roles = await this.doCheckRoles(createUserDto.roles);
        }
        if (!createUserDto.roles || createUserDto.roles.length === 0) {
            createUserDto.roles = await this.setDefaultRole();
        }
        return classToPlain(this.userRepository.save(plainToClass(User, createUserDto)));

    }

    findAll() {
        return classToPlain(this.userRepository.find());
    }

    findAllActive() {
        return classToPlain(this.userRepository.find({isActive: true}))
    }

    findAllBanned() {
        return classToPlain(this.userRepository.find({isActive: false}))
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const found = await this.userRepository.findOne({id: id});
        if (!found) {
            throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(id)));
        }
        for (let prop in found) {
            found[prop] = updateUserDto[prop] ? updateUserDto[prop] : found[prop];
        }
        return classToPlain(this.userRepository.save(plainToClass(User, found)));
    }

    async remove(id: number) {
        const found = await this.userRepository.findOne({id: id});
        if (!found) {
            throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(id)));
        }
        return this.userRepository.delete(id);

    }

    async loginUser({email, password}: LoginUserDto) {
        const user = await this.userRepository.findOne({email: email});
        if (!user) {
            throw new HttpException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(email)), HttpStatus.NOT_FOUND);
        }
        const areEqual = await comparePasswords(user.password, password);
        if (!areEqual) {
            throw new HttpException(EXCEPTION_MESSAGE.WRONG_PASSWORD.concat(String(email)), HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async findById(id: number) {
        const found = await this.userRepository.findOne({id: id});
        if (!found) {
            throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(id)));
        }
        return classToPlain(found);
    }

    async banUser(id: number) {
        const found = await this.userRepository.findOne({id: id});
        if (!found) {
            throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(id)));
        }
        found.isActive = false;
        return classToPlain(this.userRepository.save(found));
    }

    async unBan(id: number) {
        const found = await this.userRepository.findOne({id: id});
        if (!found) {
            throw new NotFoundException(EXCEPTION_MESSAGE.USER_NOT_FOUND.concat(String(id)));
        }
        found.isActive = true;
        return classToPlain(this.userRepository.save(found));
    }

    private async doCheckRoles(roles: CreateRoleDto[]) {
        roles = plainToClass(Role, roles);
        let array = [];
        for (let role of roles) {
            const found = await this.roleRepository.findOne({roleName: role.roleName});
            if (!found) {
                let newRole = await this.roleRepository.save(role);
                array.push(newRole);
            } else {
                array.push(found);
            }
        }
        return array;
    }

    private async setDefaultRole() {
        let array = [];
        const found = await this.roleRepository.findOne({roleName: ROLES.user});
        if (!found) {
            let newRole = await this.roleRepository.save({roleName: ROLES.user});
            array.push(newRole);
        } else {
            array.push(found);
        }
        return array;
    }

    async findByPayload(email) {
        return await this.userRepository.findOne({email: email});
    }

}