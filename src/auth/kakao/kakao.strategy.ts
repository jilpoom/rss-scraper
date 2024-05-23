import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.KAKAO_REST_API_KEY,
            clientSecret: '',
            callbackURL: `${process.env.HOST}/auths/kakao/authorize`,
        });
    }

    async validate(
        access_token: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void,
    ) {
        try {
            console.log(profile);

            const { _json } = profile;
            const user = {
                kakaoId: _json.id,
            };

            done(null, user);
        } catch (error) {
            done(error);
        }
    }
}
