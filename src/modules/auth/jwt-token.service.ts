import { Uuid } from "../../types";
import { RoleType } from "../../common/constants/role.type";
import { TokenType } from "../../common/constants/token-type";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";

@Injectable()
export class JwtTokenService {

  constructor(private jwtService: JwtService) { }



  async createAccessToken(data: {
    role: RoleType;
    userId: Uuid;
  }) {
    return this.createToken(TokenType.ACCESS_TOKEN, data);
  }

  private async createToken<T>(type: TokenType, data: T) {
    const token = await this.jwtService.signAsync({
      type,
      ...data,
    });

    return new TokenPayloadDto(token);
  }

}