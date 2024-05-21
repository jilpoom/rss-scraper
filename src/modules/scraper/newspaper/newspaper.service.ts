import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Newspaper, Prisma } from '@prisma/client';
import { NewspaperUpdateDTO } from './newspaper.dto';

@Injectable()
export class NewspaperService {
    constructor(private readonly prisma: PrismaService) {}

    async newspapers(): Promise<Newspaper[]> {
        return this.prisma.newspaper.findMany({});
    }

    async newspaper(id: Prisma.NewspaperWhereUniqueInput): Promise<Newspaper> {
        const newspaper = await this.prisma.newspaper.findUnique({
            where: id,
        });

        if (!newspaper) {
            throw new NotFoundException('해당 신문사가 없습니다');
        }

        return newspaper;
    }

    async create(data: Prisma.NewspaperCreateInput) {
        return this.prisma.newspaper.create({
            data,
        });
    }

    async update(params: NewspaperUpdateDTO) {
        const { id, ...rest } = params;
        return this.prisma.newspaper.update({
            where: {
                id: +id,
            },
            data: rest,
        });
    }

    async delete(id: Prisma.NewspaperWhereUniqueInput) {
        return this.prisma.newspaper.delete({
            where: id,
        });
    }
}
