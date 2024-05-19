import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { RssUrlHolder } from './rss/rss.url';
import { ParserUtil } from './util/parser.util';

@Module({
    providers: [ScraperService, RssUrlHolder, ParserUtil],
    controllers: [ScraperController],
})
export class ScraperModule {}