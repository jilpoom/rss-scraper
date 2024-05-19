import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { Feed, ParseOption } from '../rss/rss.type';
import axios from 'axios';
import { RssUrlHolder } from '../rss/rss.url';
import { MkDTO } from '../rss/rss.dto';

@Injectable()
export class ParserUtil extends XMLParser {
    constructor(private readonly rssUrlHolder: RssUrlHolder) {
        super();
    }

    async getDataAsyncWithOptions(options: ParseOption): Promise<any> {
        let data: any;

        try {
            data = (await axios.get<any>(this.rssUrlHolder.FindUrl(options.target))).data;
        } catch (e) {
            throw new Error('Rss에 연결할 수 없습니다. URL을 확인해주세요.');
        }

        return this.parseWithCategory(options, data);
    }

    private parseWithCategory(options: ParseOption, data: any): any {
        switch (options.target) {
            case '매일경제':
                return this.parseMk(data);
        }
    }

    private parseMk(data: any): MkDTO[] {
        return this.parse(data).rss.channel.item;
    }
}
