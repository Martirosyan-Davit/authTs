import { UserDto } from "../../users/dto/uses.dto";
import { TokenPayloadDto } from "./tokenPayloadDto";


export class LoginPayloadDto {

    user: UserDto;

    token: TokenPayloadDto;

    constructor(user: UserDto, token: TokenPayloadDto) {
        this.user = user;
        this.token = token;
    }
}