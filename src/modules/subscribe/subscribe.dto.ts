import { ApiProperty } from '@nestjs/swagger';

export class SubscribeCreateDTO {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    rss_id: number;

    @ApiProperty()
    cron: string;
}

export class BulkSubscribeCreateDTO {
    @ApiProperty({
        type: [SubscribeCreateDTO],
    })
    subscribes: SubscribeCreateDTO[];
}

export class SubscribeUpdateDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    rss_id: number;

    @ApiProperty()
    cron: string;
}
