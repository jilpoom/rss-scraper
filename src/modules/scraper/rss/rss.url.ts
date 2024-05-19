import { Injectable } from '@nestjs/common';

interface RssUrl {
    newspaper: string;
    url: string;
}

@Injectable()
export class RssUrlHolder {
    constructor() {}

    private readonly rssUrls: RssUrl[] = [
        {
            newspaper: '매일경제',
            url: 'https://www.mk.co.kr/rss/30000001/',
        },
    ];

    FindUrl(newspaper: string): string {
        return this.rssUrls.filter((rss) => rss.newspaper === newspaper)[0].url;
    }
}

