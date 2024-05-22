import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { KakaoSendMessageDTO } from './send.dto';
import { ScraperService } from '../scraper/scraper.service';

@Injectable()
export class SendService {
    private kakao_send_message_url = 'https://kapi.kakao.com/v2/api/talk/memo/default/send';

    constructor(private readonly scraperService: ScraperService) {}

    async sendKakaoMessageToMe(sendMessageDTO: KakaoSendMessageDTO) {
        const rss_data = await this.scraperService.getOneRssData({
            id: 15,
        });

        const data = JSON.stringify({
            object_type: 'list',
            header_title: '오늘의 뉴스',
            header_link: {
                web_url: 'https://www.daum.net',
                mobile_web_url: 'https://m.daum.net',
            },
            contents: [
                {
                    title: rss_data.item[0].title,
                    description: rss_data.item[0].description,
                    image_url: '',
                    link: {
                        web_url: rss_data.item[0].link,
                        mobile_web_url: rss_data.item[0].link,
                    },
                },
                {
                    title: rss_data.item[1].title,
                    description: rss_data.item[1].description,
                    image_url: '',
                    link: {
                        web_url: rss_data.item[1].link,
                        mobile_web_url: rss_data.item[1].link,
                    },
                },
                {
                    title: rss_data.item[2].title,
                    description: rss_data.item[2].description,
                    image_url: '',
                    link: {
                        web_url: rss_data.item[2].link,
                        mobile_web_url: rss_data.item[2].link,
                    },
                },
            ],
        });

        try {
            const res = await axios.post(
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

            return res.data;
        } catch (e) {
            console.log(e);
            throw new Error(e.data);
        }
    }
}
