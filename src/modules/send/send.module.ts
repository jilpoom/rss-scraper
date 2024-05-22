import { Module } from '@nestjs/common';
import { SendService } from './send.service';
import { SendController } from './send.controller';
import { ScraperService } from '../scraper/scraper.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { XMLParser } from 'fast-xml-parser';

@Module({
    providers: [SendService, ScraperService, PrismaService, XMLParser],
    controllers: [SendController],
})
export class SendModule {}
