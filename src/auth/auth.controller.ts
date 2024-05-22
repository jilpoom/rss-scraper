import { Body, Controller, Get, Header, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { SignInDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@ApiTags('auths')
@Controller('/auths')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    async signIn(@Body() signInDTO: SignInDTO) {
        return this.authService.signIn(signInDTO);
    }

    @Get('/kakao/redirect')
    @Header('Content-Type', 'text/html')
    async kakaoRedirect(@Res() res: Response) {
        return this.authService.kakaoRedirect(res);
    }

    @Get('/kakao/authorize')
    async kakaoAuthorize(@Query('code') code: string) {
        return this.authService.kakaoAuthorize(code);
    }

    @ApiBearerAuth('access-key')
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        return req.user;
    }
}
