import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";
import {classToPlain, plainToClass} from "class-transformer";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role) private roleRepository : Repository<Role>) {
  }
  create(createRoleDto: CreateRoleDto) {
    let role = plainToClass(Role, createRoleDto);
    return this.roleRepository.save(role)
  }

  findAll() {
    return classToPlain(this.roleRepository.find());
  }

  findOne(id: number) {
    return classToPlain(this.roleRepository.findByIds([id]));
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
