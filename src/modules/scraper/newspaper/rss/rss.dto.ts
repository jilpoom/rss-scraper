import { ApiProperty } from '@nestjs/swagger';

export class RSSCreateDTO {
    @ApiProperty()
    newspaper_id: string | number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    category: string;
}

export class RSSUpdateDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    category: string;
}
