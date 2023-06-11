import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { UserLoginDto } from "./dto/userLoginDto";
import { UserRegisterDto } from "./dto/userRegisterDto";
import { LoginPayloadDto } from "./dto/loginPayloadDto";
import { JwtTokenService } from "./jwt-token.service";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtTokenService: JwtTokenService,
    ) { }

    async validateUser(userLoginDto: UserLoginDto): Promise<LoginPayloadDto> {
        const userDto = await this.usersService.validate(userLoginDto);

        const token = await this.jwtTokenService.createAccessToken({
            role: userDto.role,
            userId: userDto.id,
        });

        return new LoginPayloadDto(userDto, token);

    }

    async userRegister(userRegisterDto: UserRegisterDto): Promise<LoginPayloadDto> {
        const userDto = await this.usersService.register(userRegisterDto);

        const token = await this.jwtTokenService.createAccessToken({
            role: userDto.role,
            userId: userDto.id,
        });

        return new LoginPayloadDto(userDto, token);
    }

}
