import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { NewspaperController } from './newspaper/newspaper.controller';
import { PrismaService } from '../common/prisma/prisma.service';
import { NewspaperService } from './newspaper/newspaper.service';
import { NewspaperModule } from './newspaper/newspaper.module';
import { RssService } from './newspaper/rss/rss.service';
import { XMLParser } from 'fast-xml-parser';

@Module({
    imports: [NewspaperModule],
    providers: [ScraperService, PrismaService, NewspaperService, RssService, XMLParser],
    controllers: [ScraperController, NewspaperController],
})
export class ScraperModule {}
