import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO, UserPasswordChangeDTO } from './user.dto';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('users')
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    async getAllUsers(): Promise<UserModel[]> {
        return this.userService.users({});
    }

    @Get('/user/:id')
    async getUserById(id: string): Promise<UserModel> {
        return this.userService.user({ id: +id });
    }

    @Get('/user/filtered-users/:searchString')
    async getFilteredUsers(@Param('searchString') searchString: string): Promise<UserModel[]> {
        return this.userService.users({
            where: {
                OR: [
                    {
                        name: { contains: searchString },
                    },
                    {
                        email: { contains: searchString },
                    },
                ],
            },
        });
    }

    @Post('user')
    async signupUser(@Body() userData: UserCreateDTO): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @ApiBearerAuth('access-key')
    @UseGuards(AuthGuard)
    @Put('change-password')
    async changePassword(@Body() userData: UserPasswordChangeDTO): Promise<UserModel> {
        const { id, ...data } = userData;

        return this.userService.updateUser({ where: { id: +id }, data });
    }
}
