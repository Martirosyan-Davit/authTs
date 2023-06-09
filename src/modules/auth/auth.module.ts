import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "../users/user.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { ApiConfigService } from "../../service/api-config.service";



@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            useFactory: (configService: ApiConfigService) => ({
                privateKey: configService.authConfig.PrivateKey,
                publicKey: configService.authConfig.PublicKey,
                signOptions: {
                    algorithm: 'PS384',
                    // expiresIn: configService.authConfig.jwtExpirationTime,
                },
                verifyOptions: {
                    algorithms: ['PS384'],
                    
                }
            })
        })
    ]
}) 
export class AuthModule{}