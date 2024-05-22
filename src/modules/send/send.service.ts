import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { KakaoSendMessageDTO } from './send.dto';

@Injectable()
export class SendService {
    private kakao_send_message_url = 'https://kapi.kakao.com/v2/api/talk/memo/default/send';

    constructor() {}

    async sendKakaoMessageToMe(sendMessageDTO: KakaoSendMessageDTO) {
        const data = JSON.stringify({
            object_type: 'text',
            text: sendMessageDTO.text,
            link: {},
        });

        try {
            await axios.post(
                this.kakao_send_message_url,
                {
                    template_object: data,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: 'Bearer ' + sendMessageDTO.access_token,
                    },
                },
            );
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
    }
}
