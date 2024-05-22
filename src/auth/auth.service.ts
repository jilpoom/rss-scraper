import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/users/user.service';
import { SignInDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../modules/users/bcrypt/bcrypt.service';
import axios from 'axios';
import { Response } from 'express';

@Injectable()
export class AuthService {
    private host = process.env.HOST!;
    private KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
    private KAKAO_REDIRECT_URI = `${this.host}/auths/kakao/authorize`;
    private KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY!;
    private KAKAO_TOKEN_PROVIDER_URL = 'https://kauth.kakao.com/oauth/token';

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly bcrypt: BcryptService,
    ) {}

    async signIn(signInDTO: SignInDTO): Promise<{ access_token: string }> {
        const user = await this.userService.users({
            where: {
                email: { contains: signInDTO.email },
            },
        });

        if (user.length === 0) {
            throw new UnauthorizedException('올바르지 않은 아이디 입니다.');
        }

        const isMatchPassword = await this.bcrypt.compare(signInDTO.password, user[0].password);

        if (!isMatchPassword) {
            throw new UnauthorizedException('비밀번호가 틀렸습니다.');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, id, ...result } = user[0];

        const payload = { sub: id, ...result };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async kakaoRedirect(res: Response) {
        const url = `${this.KAKAO_AUTHORIZE_URL}?client_id=${this.KAKAO_REST_API_KEY}&redirect_uri=${this.KAKAO_REDIRECT_URI}&response_type=code&scope=talk_message`;
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

        return response.data;
    }
}
