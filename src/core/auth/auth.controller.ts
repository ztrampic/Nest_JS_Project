import {Body, Controller, HttpException, HttpStatus, Post} from "@nestjs/common";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {RegistrationStatus} from "./helpers/interface";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto) {
        const result: RegistrationStatus = await this.authService.register(createUserDto);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}