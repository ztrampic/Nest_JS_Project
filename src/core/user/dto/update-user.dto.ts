import {IsEmail, IsNotEmpty, IsOptional, Length} from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    id: string;

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
    @IsEmail()
    email: string;

}