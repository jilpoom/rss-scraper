import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ScraperService } from '../scraper/scraper.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { XMLParser } from 'fast-xml-parser';

@Module({
    providers: [MessageService, ScraperService, PrismaService, XMLParser],
    controllers: [MessageController],
})
export class MessageModule {}
