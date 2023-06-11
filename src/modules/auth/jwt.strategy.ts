import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ApiConfigService } from "../../shared/services/api-config.service"
import { UserService } from "../users/user.service"
import { Uuid } from "../../types";
import { RoleType } from "../../common/constants/role.type";
import { TokenType } from "..//../common/constants/token-type";
import { UserEntity } from "../users/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private configService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });

  }

  // async validate(args: {
  //   userId: Uuid;
  //   role: RoleType;
  //   type: TokenType;
  // }): Promise<UserEntity> {
  //   if (args.type !== TokenType.ACCESS_TOKEN) {
  //     throw new UnauthorizedException();
  //   }

  //   const user = await this.userService.findOne({});

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }
}