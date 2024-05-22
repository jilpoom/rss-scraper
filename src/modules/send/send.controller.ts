import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KakaoSendMessageDTO } from './send.dto';
import { SendService } from './send.service';

@Controller('/send')
@ApiTags('/send')
export class SendController {
    constructor(private readonly sendService: SendService) {}

    @Post('/kakao/me')
    async sendKakaoMessageToMe(@Body() sendMessageDTO: KakaoSendMessageDTO) {
        return this.sendService.sendKakaoMessageToMe(sendMessageDTO);
    }
}
