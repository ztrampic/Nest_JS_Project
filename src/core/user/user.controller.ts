import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from './user.service'
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt.auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @HttpCode(200)
    findAll() {
        return this.userService.findAll();
    }

    @Get('active')
    @HttpCode(200)
    findAllActive() {
        return this.userService.findAllActive();
    }

    @Get('banned')
    @HttpCode(200)
    findAllBanned() {
        return this.userService.findAllBanned();
    }

    @Get(':id')
    @HttpCode(200)
    findById(@Param('id') id: string) {
        return this.userService.findById(+id);
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(200)
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Get('ban/:id')
    @HttpCode(200)
    banUser(@Param('id') id: string) {
        return this.userService.banUser(+id);
    }

    @Get('unban/:id')
    @HttpCode(200)
    unBan(@Param('id') id: string) {
        return this.userService.unBan(+id);
    }
}