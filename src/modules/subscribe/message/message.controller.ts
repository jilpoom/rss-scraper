import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';

@Controller('/message')
@ApiTags('message')
export class MessageController {
    constructor(private readonly sendService: MessageService) {}

    /**
     * @deprecated
     */
    // @Post('/kakao/me')
    // async sendKakaoMessageToMe(@Body() sendMessageDTO: KakaoMessageDTO) {
    //     return this.sendService.sendKakaoMessageToMe(sendMessageDTO);
    // }
}
