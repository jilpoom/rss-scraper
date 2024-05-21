import { Controller, Get, Param } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/scraper')
@ApiTags('scraper')
export class ScraperController {
    constructor(private readonly scraperService: ScraperService) {}

    @Get('/rss/:id')
    async getOneRssData(@Param('id') rss_id: string) {
        return this.scraperService.getOneRssData({
            id: +rss_id,
        });
    }
}
