import { ApiProperty } from '@nestjs/swagger';

export class NewspaperCreateDTO {
    @ApiProperty()
    name: string;
}

export class NewspaperUpdateDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
