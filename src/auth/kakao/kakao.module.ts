import { Module } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { UserService } from '../../modules/users/user.service';
import { KakaoController } from './kakao.controller';
import { PrismaService } from '../../modules/common/prisma/prisma.service';
import { BcryptService } from '../../modules/users/bcrypt/bcrypt.service';
import { KakaoStrategy } from './kakao.strategy';
import { AuthService } from '../auth.service';
import { CustomConfigService } from '../../config/custom-config.service';

@Module({
    providers: [
        KakaoService,
        UserService,
        PrismaService,
        BcryptService,
        KakaoStrategy,
        AuthService,
        CustomConfigService,
    ],
    controllers: [KakaoController],
})
export class KakaoModule {}
