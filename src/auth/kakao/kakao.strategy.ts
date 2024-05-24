import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { UserService } from '../../modules/users/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.KAKAO_REST_API_KEY,
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
            console.log(access_token);
            const { _json } = profile;

            const user = await this.userService.user({
                email: _json.kakao_account.email,
            });

            if (user) {
                done(null, user);
                return;
            }

            const newUser = await this.userService.createUser({
                email: _json.kakao_account.email,
                name: _json.properties.nickname,
                provider: 'kakao',
            });

            done(null, newUser);
        } catch (error) {
            done(error);
        }
    }
}
