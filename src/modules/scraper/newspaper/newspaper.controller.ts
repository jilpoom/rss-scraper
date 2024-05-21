import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { Newspaper } from '@prisma/client';
import { NewspaperCreateDTO, NewspaperUpdateDTO } from './newspaper.dto';
import { ApiTags } from '@nestjs/swagger';
import { RssService } from './rss/rss.service';

@Controller('/newspapers')
@ApiTags('newspapers')
export class NewspaperController {
    constructor(
        private readonly newspaperService: NewspaperService,
        private readonly rssService: RssService,
    ) {}

    @Get('')
    async getAllNewspapers(): Promise<Newspaper[]> {
        return this.newspaperService.findAllNewspapers();
    }

    @Get('/:id')
    async getOneNewspaper(@Param('id') id: string) {
        return this.newspaperService.findOneNewspaper({
            id: +id,
        });
    }

    @Get('/:id/rss')
    async getAllRssByNewspaper(@Param('id') id: string) {
        return this.rssService.findAllRssByNewsPaper(+id);
    }

    @Post('/')
    async createNewspaper(@Body() newspaperDTO: NewspaperCreateDTO): Promise<Newspaper> {
        return this.newspaperService.createNewspaper({
            name: newspaperDTO.name,
        });
    }

    @Put('/')
    async updateNewspaper(@Body() newspaperDTO: NewspaperUpdateDTO) {
        return this.newspaperService.updateNewspaper(newspaperDTO);
    }

    @Delete('/:id')
    async deleteNewspaper(@Param('id') id: string) {
        return this.newspaperService.deleteNewspaper({
            id: +id,
        });
    }
}
