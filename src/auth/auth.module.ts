import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../modules/users/user.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../modules/common/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { BcryptService } from '../modules/users/bcrypt/bcrypt.service';
import { KakaoModule } from './kakao/kakao.module';
import { CustomConfigService } from '../config/custom-config.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
        KakaoModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        PrismaService,
        AuthGuard,
        BcryptService,
        CustomConfigService,
    ],
})
export class AuthModule {}
