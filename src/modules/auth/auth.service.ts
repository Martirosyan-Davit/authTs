import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private usersService: UsersService,
        private configService: JwtService
        ) {}

    

}
