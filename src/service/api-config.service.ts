import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isNil } from "lodash";

@Injectable()
export class ApiConfigService{
    constructor(private readonly configService: ConfigService) { }
    public get authConfig(){
        return {
            PublicKey: this.getString('hghtdd6doiguggutff5tftffyfykkfyukyfukyfuf5f7gtugu'), // JWT_PRIVATE_KEY
            PrivateKey: this.getString('ccyrjcftdydtdytkyglulihgiylglyilyigtityi'), // JWT_PUBLIC_KEY
            jwtExpirationTime: this.getNumber('30') //JWT_EXPIRATION_TIME
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

        if(isNil(value)) {
            throw new Error(key + ' environment variable does not set');
        }

        return value;
    }
}