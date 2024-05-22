import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class ScraperService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly parser: XMLParser,
    ) {}

    async getOneRssData(id: Prisma.RssWhereUniqueInput): Promise<any> {
        const rss = await this.prisma.rss.findUnique({
            where: id,
        });

        if (!rss) {
            throw new Error('해당 Rss가 없습니다.');
        }

        const data = await this.request(rss.url);

        return this.parser.parse(data).rss.channel;
    }

    private async request(url: string): Promise<any> {
        return (await axios.get<any>(url)).data;
    }
}
