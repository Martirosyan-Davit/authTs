import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UserService) { }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'The user has been successfully created.',
    })
    createUser(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.create(userDto)
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The user has been successfully updated.',
    })
    updateUser(
        @Param('id') id: string,
        @Body() userDto: UpdateUserDto
    ): Promise<UserEntity> {
        return this.userService.update(userDto, id)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'delete user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The user has been successfully deleted.',
    })
    deleteUserById(
        @Param('id') id: string,
    ): Promise<UserEntity> {
        return this.userService.deleteById(id);
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'find user by user id' })
    @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The user has been successfully found.',
    })
    getUserById(
        @Param('id') id: string
    ): Promise<UserEntity> {
        return this.userService.findById(id);
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'find user by admin id' })
    @ApiResponse({ status: HttpStatus.OK, type: [UserEntity] })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The users has been successfully found.',
    })
    getUsers(
        @Param('id') id: string
    ): Promise<UserEntity[]> {
        return this.userService.gelAll(id);
    }


}
