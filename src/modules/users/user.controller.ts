import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from './user.dto';

@ApiTags('users')
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('user')
    async signupUser(@Body() userData: UserCreateDTO): Promise<UserModel> {
        return this.userService.createUser(userData);
    }
}
