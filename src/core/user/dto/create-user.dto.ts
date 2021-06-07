import {CreateRoleDto} from "../../role/dto/create-role.dto";
import {IsEmail, IsNotEmpty, IsOptional, Length, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(10, 20)
    username: string;

    @IsOptional()
    @Length(1, 15)
    name: string;

    @IsOptional()
    @Length(1, 15)
    lastname: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ValidateNested({each: true})
    @Type(() => CreateRoleDto)
    roles: CreateRoleDto[];
}