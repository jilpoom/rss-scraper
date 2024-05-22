import { ApiProperty } from '@nestjs/swagger';

export class KakaoSendMessageDTO {
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    text: string;
}
