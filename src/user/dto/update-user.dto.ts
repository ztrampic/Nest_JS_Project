import {IsEmail, IsNotEmpty} from "class-validator";
import {CreateRoleDto} from "../../role/dto/create-role.dto";

export class UpdateUserDto {
    @IsNotEmpty()
    id: string;

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