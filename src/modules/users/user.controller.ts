import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO, UserPasswordChangeDTO } from './user.dto';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('users')
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
