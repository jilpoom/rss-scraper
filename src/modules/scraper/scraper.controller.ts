import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('/scraper')
@ApiTags('scraper')
export class ScraperController {
    constructor(private readonly scraperService: ScraperService) {}
}