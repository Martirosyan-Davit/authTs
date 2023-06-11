import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/uses.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private userService: UserService) { }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The user has been successfully updated.',
    })
    updateUser(
        @Param('id') id: string,
        @Body() userDto: UpdateUserDto
    ): Promise<UserDto> {
        return this.userService.update(userDto, id)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'delete user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The user has been successfully deleted.',
    })
    deleteUserById(
        @Param('id') id: string,
    ): Promise<UserDto> {
        return this.userService.deleteById(id);
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'find user by user id' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The user has been successfully found.',
    })
    getUserById(
        @Param('id') id: string
    ): Promise<UserDto> {
        return this.userService.findById(id);
    }
}
