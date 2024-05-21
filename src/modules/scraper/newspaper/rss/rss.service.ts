import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { RSSCreateDTO, RSSUpdateDTO } from './rss.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RssService {
    constructor(private readonly prisma: PrismaService) {}

    async rsses() {
        return this.prisma.rss.findMany();
    }

    async findAllRssByNewsPaper(newspaper_id: number) {
        return this.prisma.rss.findMany({
            where: {
                newspaper_id: newspaper_id,
            },
        });
    }

    async create(data: RSSCreateDTO) {
        return this.prisma.rss.create({
            data: {
                newspaper_id: +data.newspaper_id,
                url: data.url,
                category: data.category,
            },
        });
    }

    async update(rssUpdateDTO: RSSUpdateDTO) {
        return this.prisma.rss.update({
            where: {
                id: +rssUpdateDTO.id,
            },
            data: {
                category: rssUpdateDTO.category,
                url: rssUpdateDTO.url,
            },
        });
    }

    async delete(id: Prisma.RssWhereUniqueInput) {
        return this.prisma.rss.delete({
            where: id,
        });
    }
}
