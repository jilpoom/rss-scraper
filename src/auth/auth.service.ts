import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/users/user.service';
import { SignInDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(signInDTO: SignInDTO): Promise<{ access_token: string }> {
        const user = await this.userService.users({
            where: {
                email: { contains: signInDTO.email },
            },
        });

        if (user.length === 0 || user[0].password !== signInDTO.password) {
            throw new UnauthorizedException('올바르지 않은 아이디 입니다.');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, id, ...result } = user[0];

        const payload = { sub: id, ...result };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
