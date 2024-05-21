import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RSSCreateDTO {
    @ApiProperty()
    newspaper_id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    category: string;
}

export class RSSUpdateDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    category: string;
}

export class BulkRSSCreateDTO {
    @ApiProperty({
        type: [RSSCreateDTO],
    })
    @IsArray()
    data: RSSCreateDTO[];
}
