import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../modules/users/user.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../modules/prisma/prisma.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}
