import { Injectable } from '@nestjs/common';
import { ParserUtil } from './util/parser.util';

@Injectable()
export class ScraperService {
    constructor(private readonly parser: ParserUtil) {}

    async FindRss(target: string) {
        return this.parser.getDataAsyncWithOptions({
            target: target,
        });
    }
}
