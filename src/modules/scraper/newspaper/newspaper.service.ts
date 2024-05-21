import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Newspaper, Prisma } from '@prisma/client';
import { NewspaperUpdateDTO } from './newspaper.dto';

@Injectable()
export class NewspaperService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllNewspapers(): Promise<Newspaper[]> {
        return this.prisma.newspaper.findMany({});
    }

    async findOneNewspaper(id: Prisma.NewspaperWhereUniqueInput): Promise<Newspaper> {
        const newspaper = await this.prisma.newspaper.findUnique({
            where: id,
        });

        if (!newspaper) {
            throw new Error('해당 신문사가 없습니다');
        }

        return newspaper;
    }

    async createNewspaper(data: Prisma.NewspaperCreateInput) {
        return this.prisma.newspaper.create({
            data,
        });
    }

    async updateNewspaper(params: NewspaperUpdateDTO) {
        const { where, data } = params;
        return this.prisma.newspaper.update({
            data,
            where,
        });
    }

    async deleteNewspaper(id: Prisma.NewspaperWhereUniqueInput) {
        return this.prisma.newspaper.delete({
            where: id,
        });
    }
}
