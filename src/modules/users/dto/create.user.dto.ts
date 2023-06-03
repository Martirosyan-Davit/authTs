import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto{

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


    @ApiProperty({
        type: Boolean,
        description: 'The state of admin'
    })
    @IsBoolean()
    admin: boolean;  

}