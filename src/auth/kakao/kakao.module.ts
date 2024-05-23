import { Module } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { UserService } from '../../modules/users/user.service';
import { KakaoController } from './kakao.controller';
import { PrismaService } from '../../modules/common/prisma/prisma.service';
import { BcryptService } from '../../modules/users/bcrypt/bcrypt.service';
import { KakaoStrategy } from './kakao.strategy';

@Module({
    providers: [KakaoService, UserService, PrismaService, BcryptService, KakaoStrategy],
    controllers: [KakaoController],
})
export class KakaoModule {}
