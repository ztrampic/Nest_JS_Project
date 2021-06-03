import {CreateRoleDto} from "../../role/dto/create-role.dto";
import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    name: string;

    lastname: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    roles: CreateRoleDto[];
}