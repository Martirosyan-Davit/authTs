import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserLoginDto } from "./dto/UserLoginDto";
import { UtilsProvider } from '../../providers/utils.provider';
import { UserNotFound } from "../../exceptions/user_not_found";
import { UserEntity } from "../users/user.entity";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";
import { ApiConfigService } from "src/service/api-config.service";
import { RoleType } from "../../common/constants/role.type";
import { TokenType } from "../../common/constants/token-type";
import { Uuid } from "../../types";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ApiConfigService
    ) { }

    async createAccessToken(data: {
        role: RoleType;
        userId: Uuid;
    }) {
        return new TokenPayloadDto({
            expiresIn: this.configService.authConfig.jwtExpirationTime,
            accessToken: await this.jwtService.signAsync({
                userId: data.userId,
                type: TokenType.ACCESS_TOKEN,
                role: data.role,
            }),
        });
    }


    async userValidator(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const user = await this.usersService.findOne({
            email: userLoginDto.email,
        })

        const PasswordValid = await UtilsProvider.validatePassword(
            userLoginDto.password,
            user?.password)

        if (!PasswordValid) throw new UserNotFound();

        return user!;
    }

}
