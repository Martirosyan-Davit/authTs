import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Trim } from "../../../decorators/transform.decorator";
import { ApiProperty } from "@nestjs/swagger";


export class UserRegisterDto {

    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({
        type: String
    })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({
        type: String
    })
    readonly email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({
        type: String
    })
    readonly password: string;

}


