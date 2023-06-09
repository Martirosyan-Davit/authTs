import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "../users/user.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { ApiConfigService } from "../../service/api-config.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PublicStrategy } from "./public.strategy";



@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            useFactory: (configService: ApiConfigService) => { 
                console.log(configService, "esa inqy")
                return ({
                privateKey: configService.authConfig.PrivateKey,
                publicKey: configService.authConfig.PublicKey,
                signOptions: {
                    algorithm: 'PS384',
                    // expiresIn: configService.authConfig.jwtExpirationTime,
                },
                verifyOptions: {
                    algorithms: ['PS384'],
                    
                },
            })},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PublicStrategy],
    exports: [JwtModule, AuthService],
}) 
export class AuthModule{}