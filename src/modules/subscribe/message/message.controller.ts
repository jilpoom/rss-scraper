import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KakaoMessageDTO } from './message.dto';
import { MessageService } from './message.service';

@Controller('/message')
@ApiTags('message')
export class MessageController {
    constructor(private readonly sendService: MessageService) {}

    @Post('/kakao/me')
    async sendKakaoMessageToMe(@Body() sendMessageDTO: KakaoMessageDTO) {
        return this.sendService.sendKakaoMessageToMe(sendMessageDTO);
    }
}
