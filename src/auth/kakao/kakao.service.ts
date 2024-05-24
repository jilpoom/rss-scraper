import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import { UserService } from '../../modules/users/user.service';

@Injectable()
export class KakaoService {
    private HOST = process.env.HOST!;
    private KAKAO_REDIRECT_URI = `${this.HOST}/auths/kakao/authorize`;
    private KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY!;
    private KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
    private KAKAO_TOKEN_PROVIDER_URL = 'https://kauth.kakao.com/oauth/token';
    private KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me';

    constructor(private readonly userService: UserService) {}

    async kakaoRedirect(res: Response) {
        const url = `${this.KAKAO_AUTHORIZE_URL}?client_id=${this.KAKAO_REST_API_KEY}&redirect_uri=${this.KAKAO_REDIRECT_URI}&response_type=code&scope=talk_message,profile_nickname,account_email`;
        res.redirect(url);
    }

    async kakaoAuthorize(code: string) {
        const data = {
            grant_type: 'authorization_code',
            client_id: this.KAKAO_REST_API_KEY,
            redirect_uri: this.KAKAO_REDIRECT_URI,
            code,
        };

        const response = await axios.post<any>(this.KAKAO_TOKEN_PROVIDER_URL, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });

        try {
            const user_kakao_info = await this.kakaoUserInfo(response.data.access_token);
            console.log(user_kakao_info);

            const user = await this.userService.user({
                email: user_kakao_info.kakao_account.email,
            });

            if (!user) {
                await this.userService.createUser({
                    email: user_kakao_info.kakao_account.email,
                    name: user_kakao_info.kakao_account.profile.nickname,
                    password: '0000',
                    provider: 'kakao',
                });
            }
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException('카카오 로그인 실패');
        }

        return response.data;
    }

    private async kakaoUserInfo(kakao_access_token: string) {
        const response = await axios.get<any>(this.KAKAO_USER_INFO_URL, {
            headers: {
                Authorization: 'Bearer ' + kakao_access_token,
            },
        });

        return response.data;
    }
}
