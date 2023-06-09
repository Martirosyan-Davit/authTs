import { Module, forwardRef } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PublicStrategy } from "./public.strategy";
import { ApiConfigService } from "../../shared/services/api-config.service";
import { JwtTokenService } from "./jwt-token.service";

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: (configService: ApiConfigService) => ({
                privateKey: configService.authConfig.privateKey,
                publicKey: configService.authConfig.publicKey,
            }),
            inject: [ApiConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PublicStrategy, JwtTokenService],
    exports: [JwtModule, AuthService],
})
export class AuthModule { }