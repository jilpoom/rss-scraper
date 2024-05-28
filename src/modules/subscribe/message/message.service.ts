import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { KakaoMessageDTO } from './message.dto';
import { ScraperService } from '../../scraper/scraper.service';
import { KakaoService } from '../../../auth/kakao/kakao.service';

@Injectable()
export class MessageService {
    private KAKAO_SEND_MESSAGE_URL = 'https://kapi.kakao.com/v2/api/talk/memo/default/send';

    constructor(
        private readonly scraperService: ScraperService,
        private readonly kakaoService: KakaoService,
    ) {}

    async sendKakaoMessageToMe(sendMessageDTO: KakaoMessageDTO, user_id: number) {
        const rss_data = await this.scraperService.getOneRssData({
            id: sendMessageDTO.id,
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

        let res;

        try {
            // Access Token Validate
            await this.kakaoService.kakaoUserInfo(sendMessageDTO.access_token);
        } catch (e) {
            try {
                sendMessageDTO.access_token = (
                    await this.kakaoService.kakaoReauth(user_id)
                ).access_token;
            } catch (e) {
                throw new Error('재 로그인이 필요합니다.');
            }
        } finally {
            res = await axios.post(
                this.KAKAO_SEND_MESSAGE_URL,
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
        }

        return res.data;
    }
}
