import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class UpdateUserDto {

    @ApiProperty({
        type: String,
        description: 'The name of a user'
    })
    @IsString()
    name: string;


    @ApiProperty({
        type: String,
        description: 'The email of user'
    })
    @IsString()
    @IsEmail()
    email: string;


    @ApiProperty({
        type: String,
        description: 'The password of user'
    })
    @IsString()
    password: string;
}
