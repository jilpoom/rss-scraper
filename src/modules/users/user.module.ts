import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../common/prisma/prisma.service';
import { BcryptService } from './bcrypt/bcrypt.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService, BcryptService],
})
export class UserModule {}
