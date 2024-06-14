import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { UserService } from '../../modules/users/user.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '../../modules/common/prisma/prisma.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
    private CACHE_TTL = 24 * 60 * 1000;

    constructor(
        private readonly userService: UserService,
        private readonly prisma: PrismaService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {
        super({
            clientID: process.env.KAKAO_REST_API_KEY,
            callbackURL: `${process.env.HOST}/login/auth`,
        });
    }

    async validate(
        access_token: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void,
    ) {
        try {
            const { _json } = profile;

            const user = await this.userService.user({
                email: _json.kakao_account.email,
            });

            if (user) {
                const key = `kakao_token:` + user.id;
                const value = {
                    user_id: user.id,
                    access_token,
                    refresh_token: refreshToken,
                };
                await this.cacheManager.set(key, JSON.stringify(value), this.CACHE_TTL);

                await this.prisma.token.updateMany({
                    where: {
                        user_id: user.id,
                    },
                    data: {
                        refresh_token: refreshToken,
                    },
                });

                done(null, user);
                return;
            }

            const newUser = await this.userService.createUser({
                email: _json.kakao_account.email,
                name: _json.properties.nickname,
                provider: 'kakao',
                password: '0000',
            });

            const key = `kakao_token:` + newUser.id;
            const value = {
                user_id: newUser.id,
                access_token,
                refresh_token: refreshToken,
            };

            await this.cacheManager.set(key, JSON.stringify(value), this.CACHE_TTL);

            await this.prisma.token.create({
                data: {
                    user_id: newUser.id,
                    refresh_token: refreshToken,
                },
            });

            done(null, newUser);
        } catch (error) {
            done(error);
        }
    }
}
