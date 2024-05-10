import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDTO {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class UserPasswordChangeDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    password: string;
}
