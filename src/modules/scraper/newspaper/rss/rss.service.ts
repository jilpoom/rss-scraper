import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class RssService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllRssByNewsPaper(newspaper_id: number) {
        return this.prisma.rss.findMany({
            where: {
                newspaper_id: newspaper_id,
            },
        });
    }
}
