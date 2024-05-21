import { Module } from '@nestjs/common';
import { NewspaperController } from './newspaper.controller';
import { NewspaperService } from './newspaper.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RssService } from './rss/rss.service';

@Module({
    controllers: [NewspaperController],
    providers: [NewspaperService, PrismaService, RssService],
})
export class NewspaperModule {}
