import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isNil } from "lodash";
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class ApiConfigService {
    constructor(private  configService: ConfigService) {}
    public get authConfig() {
        return {
            publicKey: this.getString('JWT_PUBLIC_KEY'), // JWT_PRIVATE_KEY
            privateKey: this.getString('JWT_PRIVATE_KEY'), // JWT_PUBLIC_KEY
            // jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'), //JWT_EXPIRATION_TIME            
        }
    }

    private getString(key: string) {

        const value = this.get(key);

        return value.replace(/\\n/g, '\n');
    }

    private getNumber(key: string) {
        const value = this.get(key);

        try {
            return Number(value)
        } catch {
            throw new Error(key + ' environment variable is not a number');
        }
    }

    private get(key: string): string {
        const value = this.configService.get<string>(key);

        if (isNil(value)) {
            throw new Error(key + ' environment variable does not set');
        }

        return value;
    }
}