import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content?: string;

    @ApiProperty()
    authorEmail: string;
}
