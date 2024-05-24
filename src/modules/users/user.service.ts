import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { BcryptService } from './bcrypt/bcrypt.service';
import { UserSearchDTO, UserUpdateDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private bcrypt: BcryptService,
    ) {}

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(params: UserSearchDTO): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        if (!data.password) {
            throw new Error('패스워드를 입력해주세요');
        }

        data.password = await this.bcrypt.hash(data.password);

        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(params: UserUpdateDTO): Promise<User> {
        const { where, data } = params;

        if (!data.password) {
            throw new Error('패스워드를 입력해주세요');
        }

        data.password = await this.bcrypt.hash(data.password as string);

        return this.prisma.user.update({
            where,
            data,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
