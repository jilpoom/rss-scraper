import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../modules/users/user.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../modules/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { BcryptService } from '../modules/users/bcrypt/bcrypt.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, PrismaService, AuthGuard, BcryptService],
})
export class AuthModule {}
