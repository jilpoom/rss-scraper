import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { Newspaper, Rss } from '@prisma/client';
import { NewspaperCreateDTO, NewspaperUpdateDTO } from './newspaper.dto';
import { ApiTags } from '@nestjs/swagger';
import { RssService } from './rss/rss.service';
import { RSSCreateDTO, RSSUpdateDTO } from './rss/rss.dto';

@Controller('/newspapers')
@ApiTags('newspapers')
export class NewspaperController {
    constructor(
        private readonly newspaperService: NewspaperService,
        private readonly rssService: RssService,
    ) {}

    @Get('')
    async getAllNewspapers(): Promise<Newspaper[]> {
        return this.newspaperService.newspapers();
    }

    @Get('/rss')
    async getAllRss() {
        return this.rssService.rsses();
    }

    @Get('/:id')
    async getOneNewspaper(@Param('id') id: string) {
        return this.newspaperService.newspaper({
            id: +id,
        });
    }

    @Get('/:id/rss')
    async getAllRssByNewspaper(@Param('id') id: string) {
        return this.rssService.findAllRssByNewsPaper(+id);
    }

    @Post('/')
    async createNewspaper(@Body() newspaperDTO: NewspaperCreateDTO): Promise<Newspaper> {
        return this.newspaperService.create(newspaperDTO);
    }

    @Post('/rss')
    async createRss(@Body() rssCreateDTO: RSSCreateDTO): Promise<Rss> {
        return this.rssService.create(rssCreateDTO);
    }

    @Put('/')
    async updateNewspaper(@Body() newspaperDTO: NewspaperUpdateDTO) {
        return this.newspaperService.update(newspaperDTO);
    }

    @Put('/rss')
    async updateRss(@Body() rssUpdateDTO: RSSUpdateDTO): Promise<Rss> {
        return this.rssService.update(rssUpdateDTO);
    }

    @Delete('/:id')
    async deleteNewspaper(@Param('id') id: string) {
        return this.newspaperService.delete({
            id: +id,
        });
    }

    @Delete('/rss/:id')
    async deleteRss(@Param('id') id: string) {
        return this.rssService.delete({
            id: +id,
        });
    }
}
