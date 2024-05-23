import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubscribeService } from './subscribe.service';
import { BulkSubscribeCreateDTO, SubscribeUpdateDTO } from './subscribe.dto';

@Controller('/subscribes')
@ApiTags('subscribes')
export class SubscribeController {
    constructor(private readonly subscribeService: SubscribeService) {}

    @Get('/:user_id')
    async getSubscribesByUser(@Param('user_id') user_id: string) {
        return this.subscribeService.subscribesByUser(+user_id);
    }

    @Post('/')
    async postSubscribes(@Body() bulkSubscribeCreateDTO: BulkSubscribeCreateDTO) {
        return this.subscribeService.insertSubscribes(bulkSubscribeCreateDTO);
    }

    @Put('/:id')
    async updateSubscribe(@Body() subscribeUpdateDTO: SubscribeUpdateDTO) {
        return this.subscribeService.updateSubscribe(subscribeUpdateDTO);
    }
}
