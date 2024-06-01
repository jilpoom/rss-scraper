import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { PrismaService } from '../../modules/common/prisma/prisma.service';

@Injectable()
export class KakaoService {
    private HOST = process.env.HOST!;
    private KAKAO_REDIRECT_URI = `${this.HOST}/login/auth`;
    private KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY!;
    private KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
    private KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me';
    private KAKAO_REAUTH_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

    constructor(private readonly prisma: PrismaService) {}

    async kakaoRedirect(res: Response) {
        const url = `${this.KAKAO_AUTHORIZE_URL}?client_id=${this.KAKAO_REST_API_KEY}&redirect_uri=${this.KAKAO_REDIRECT_URI}&response_type=code&scope=talk_message,profile_nickname,account_email`;
        res.redirect(url);
    }

    async kakaoReauth(user_id: number) {
        const refresh_token = await this.prisma.token.findMany({
            where: {
                user_id: user_id,
            },
        });

        const data = {
            grant_type: 'refresh_token',
            client_id: this.KAKAO_REST_API_KEY,
            refresh_token: refresh_token[0].refresh_token,
        };

        let response: AxiosResponse<any, any>;

        try {
            response = await axios.post(this.KAKAO_REAUTH_TOKEN_URL, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });
        } catch (e) {
            throw new Error(e.message);
        }

        return response.data;
    }

    async kakaoUserInfo(kakao_access_token: string) {
        const response = await axios.get<any>(this.KAKAO_USER_INFO_URL, {
            headers: {
                Authorization: 'Bearer ' + kakao_access_token,
            },
        });

        return response.data;
    }
}
