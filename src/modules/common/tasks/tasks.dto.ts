import { Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReverseParseCronDTO {
    @Min(0)
    @Max(23)
    @ApiProperty()
    hours?: number;

    @Min(0)
    @Max(59)
    @ApiProperty()
    minutes?: number;
}
