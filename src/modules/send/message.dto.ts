import { ApiProperty } from '@nestjs/swagger';

export class KakaoMessageDTO {
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    text: string;
}
