import { ApiProperty } from '@nestjs/swagger';
import { ReverseParseCronDTO } from '../common/tasks/tasks.dto';

export class SubscribeCreateDTO {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    rss_id: number;

    @ApiProperty({
        type: ReverseParseCronDTO,
    })
    cron: ReverseParseCronDTO;
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

    @ApiProperty({
        type: ReverseParseCronDTO,
    })
    cron: ReverseParseCronDTO;
}
