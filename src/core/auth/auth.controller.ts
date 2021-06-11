import {Body, Controller, HttpException, HttpStatus, Post} from "@nestjs/common";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {OpenPublic, RegistrationStatus} from "./helpers/auth.helper";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @Post('login')
    @OpenPublic()
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @Post('register')
    @OpenPublic()
    public async register(@Body() createUserDto: CreateUserDto) {
        const result: RegistrationStatus = await this.authService.register(createUserDto);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}