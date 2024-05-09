import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/users/user.service';
import { SignInDTO } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signIn(signInDTO: SignInDTO): Promise<any> {
        const user = await this.userService.users({
            where: {
                email: { contains: signInDTO.email },
            },
        });

        if (user.length === 0 || user[0].password !== signInDTO.password) {
            throw new UnauthorizedException('올바르지 않은 아이디 입니다.');
        }

        //TODO: Write Here, JWT Token Response Logic

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user[0];

        return result;
    }
}
