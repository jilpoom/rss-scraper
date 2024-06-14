import { Controller, Get, Header, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { KakaoService } from './kakao.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
import { Public } from '../auth.decorator';

@Controller('/auths/kakao')
@ApiTags('auths')
export class KakaoController {
    constructor(
        private readonly kakaoService: KakaoService,
        private readonly authService: AuthService,
    ) {}

    @Public()
    @Get('/redirect')
    @Header('Content-Type', 'text/html')
    async kakaoRedirect(@Res() res: Response) {
        return this.kakaoService.kakaoRedirect(res);
    }

    @Public()
    @Get('/authorize')
    @UseGuards(AuthGuard('kakao'))
    async kakaoAuthorize(@Req() req: Request) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email, password, provider, ...rest } = req.user as User;
        return this.authService.signIn({
            email,
            password,
        });
    }
}
