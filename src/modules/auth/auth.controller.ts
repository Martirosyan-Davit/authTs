import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/userLoginDto";
import { LoginPayloadDto } from "./dto/loginPayloadDto";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserRegisterDto } from "./dto/userRegisterDto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    userLogin(@Body() userLoginDTO: UserLoginDto) {
        return this.authService.validateUser(userLoginDTO);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User register',
    })
    userRegister(@Body() userRegisterDto: UserRegisterDto) {
        return this.authService.userRegister(userRegisterDto);
    }
}


