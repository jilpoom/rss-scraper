import { Controller, Get, Header, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { KakaoService } from './kakao.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auths/kakao')
@ApiTags('auths')
export class KakaoController {
    constructor(private readonly kakaoService: KakaoService) {}

    @Get('/redirect')
    @Header('Content-Type', 'text/html')
    async kakaoRedirect(@Res() res: Response) {
        return this.kakaoService.kakaoRedirect(res);
    }

    @Get('/authorize')
    @UseGuards(AuthGuard('kakao'))
    async kakaoAuthorize(@Req() req: Request, @Res() res: Response) {
        console.log(req.user);
        return req.user;
    }
}
