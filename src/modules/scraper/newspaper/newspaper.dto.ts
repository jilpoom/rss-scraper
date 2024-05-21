import { ApiProperty } from '@nestjs/swagger';

export class NewspaperCreateDTO {
    @ApiProperty()
    name: string;
}

export class NewspaperUpdateDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}
