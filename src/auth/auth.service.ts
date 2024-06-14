import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/users/user.service';
import { SignInDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../modules/users/bcrypt/bcrypt.service';
import { CustomConfigService } from '../config/custom-config.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly bcrypt: BcryptService,
        private readonly config: CustomConfigService,
    ) {}

    async signIn(signInDTO: SignInDTO): Promise<{ access_token: string; refresh_token: string }> {
        const user = await this.userService.users({
            where: {
                email: { contains: signInDTO.email },
            },
        });

        if (user.length === 0) {
            throw new UnauthorizedException('올바르지 않은 아이디 입니다.');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, id, ...result } = user[0];

        const payload = { sub: id, ...result };

        if (user[0].provider === 'kakao') {
            return {
                access_token: await this.getAccessToken(payload),
                refresh_token: await this.getRefreshToken(),
            };
        }

        const isMatchPassword = await this.bcrypt.compare(signInDTO.password, user[0].password);

        if (!isMatchPassword) {
            throw new UnauthorizedException('비밀번호가 틀렸습니다.');
        }

        return {
            access_token: await this.getAccessToken(payload),
            refresh_token: await this.getRefreshToken(),
        };
    }

    private async getAccessToken(payload) {
        const { access_token_secret_key, access_token_expires_in } = this.config.getJwtConfig();

        return this.jwtService.signAsync(payload, {
            secret: access_token_secret_key,
            expiresIn: access_token_expires_in,
        });
    }

    private async getRefreshToken() {
        const { refresh_token_secret_key, refresh_token_expires_in } = this.config.getJwtConfig();
        return this.jwtService.signAsync(
            {},
            {
                secret: refresh_token_secret_key,
                expiresIn: refresh_token_expires_in,
            },
        );
    }
}
