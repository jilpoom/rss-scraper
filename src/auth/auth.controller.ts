import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignInDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@ApiTags('auths')
@Controller('/auths')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    async signIn(@Body() signInDTO: SignInDTO) {
        return this.authService.signIn(signInDTO);
    }

    @ApiBearerAuth('access-key')
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        return req.user;
    }
}
