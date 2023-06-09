import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Trim } from "../../../decorators/transform.decorator";


export class UserRegisterDto{

    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly email: string;

    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

}


