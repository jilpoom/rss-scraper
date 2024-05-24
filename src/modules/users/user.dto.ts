import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserCreateDTO {
    @ApiProperty()
    name?: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @Length(8, 20)
    @ApiProperty()
    password: string;

    provider?: string;
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
