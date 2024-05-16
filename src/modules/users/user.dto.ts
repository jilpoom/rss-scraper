import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

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

export class UserSearchDTO {
    @ApiProperty()
    skip?: number;

    @ApiProperty()
    take?: number;

    @ApiProperty()
    cursor?: Prisma.UserWhereUniqueInput;

    @ApiProperty()
    where?: Prisma.UserWhereInput;

    @ApiProperty()
    orderBy?: Prisma.UserOrderByWithRelationInput;
}

export class UserUpdateDTO {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
}
