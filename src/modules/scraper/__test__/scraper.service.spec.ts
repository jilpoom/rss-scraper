import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

describe('ScraperService', () => {
    test('axios', async () => {
        const data = await axios.get<any>('https://www.mk.co.kr/rss/30100041/');
        const parser = new XMLParser();
        const result = parser.parse(data.data);

        console.log(JSON.stringify(result, null, 4));
    });
});
