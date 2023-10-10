import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import  UserDto  from '../../dto/user.dto'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSearchQuery } from 'src/model/local/userQueries';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('save')
    @ApiOperation({ summary: 'Saves a new User' })
    @ApiOkResponse({ description: 'User successfully saved', type: UserDto  })
    @ApiBadRequestResponse({ description: 'Invalid user data provided' })
    async saveUser(@Body() userDTO: UserDto): Promise<UserDto>{
        return await this.userService.saveUser(userDTO);
    }

    @Get('/search')
    @ApiOperation({ summary: 'Gets a User by Search Term' })
    @ApiOkResponse({ description: 'Users successfully retrieved', type: UserDto })
    @ApiNotFoundResponse({ description: 'Users not found' })
    async getUsers(@Query() query: UserSearchQuery): Promise<UserDto[]>{
        return this.userService.getUserBySearch(query);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Gets a User by ID' })
    @ApiOkResponse({ description: 'User successfully retrieved', type: UserDto })
    @ApiNotFoundResponse({ description: 'User not found' })
    async getUserById(@Param('id') id: string): Promise<UserDto> {
        return await this.userService.getUserById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Updates a User' })
    @ApiOkResponse({ description: 'User successfully updated', type: UserDto })
    @ApiBadRequestResponse({ description: 'Invalid user data provided' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async updateUser(@Param('id') id: string, @Body() userDTO: UserDto) {
        return await this.userService.updateUser(userDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletes a User' })
    @ApiOkResponse({ description: 'User successfully deleted' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async deleteUser(@Param('id') id: number): Promise<void> {
        return await this.userService.deleteUser(id);
    }
}
