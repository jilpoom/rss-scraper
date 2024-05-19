import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('/scraper')
@ApiTags('scraper')
export class ScraperController {
    constructor(private readonly scraperService: ScraperService) {}

    @ApiQuery({
        name: 'target',
        required: true,
        description: '불러올 신문사 이름',
    })
    @Get('')
    async getRssData(@Query('target') target: string) {
        return this.scraperService.FindRss(target);
    }
}