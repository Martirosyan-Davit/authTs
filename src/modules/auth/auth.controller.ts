import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/UserLoginDto";
import { LoginPayloadDto } from "./dto/LoginPayloadDto";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserRegisterDto } from "./dto/UserRegisterDto";

@Controller('auth')
export class AuthController {



    constructor(
        private userService: UserService,
        private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)  
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(@Body() userLoginDTO: UserLoginDto) {
        const userEntity = (await this.authService.userValidator(userLoginDTO));

        const token = await this.authService.createAccessToken({
            role: userEntity.role,
            userId: userEntity.id,
        })


        return new LoginPayloadDto(userEntity, token) // TODO

    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async userCreate(
        @Body() userRegisterDto: UserRegisterDto) {

        const createdUser = await this.userService.create(userRegisterDto);

        return createdUser.toDto()
    }
}


