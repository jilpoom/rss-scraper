import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { TasksService } from '../common/tasks/tasks.service';
import { MessageService } from './message/message.service';
import { ScraperService } from '../scraper/scraper.service';
import { XMLParser } from 'fast-xml-parser';

@Module({
    providers: [
        PrismaService,
        SubscribeService,
        TasksService,
        MessageService,
        ScraperService,
        XMLParser,
    ],
    controllers: [SubscribeController],
})
export class SubscribeModule {}
