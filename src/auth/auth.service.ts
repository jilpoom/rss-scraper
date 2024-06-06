import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/users/user.service';
import { SignInDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../modules/users/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
    private ACCESS_TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY;
    private ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN;
    private REFRESH_TOKEN_SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
    private REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly bcrypt: BcryptService,
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
        return this.jwtService.signAsync(payload, {
            secret: this.ACCESS_TOKEN_SECRET_KEY,
            expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
        });
    }

    private async getRefreshToken() {
        return this.jwtService.signAsync(
            {},
            {
                secret: this.REFRESH_TOKEN_SECRET_KEY,
                expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
            },
        );
    }
}
