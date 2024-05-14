import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class PostCreateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content?: string;

    @ApiProperty()
    authorEmail: string;
}

export class PostSearchDTO {
    @ApiProperty()
    skip?: number;

    @ApiProperty()
    take?: number;

    @ApiProperty()
    cursor?: Prisma.PostWhereUniqueInput;

    @ApiProperty()
    where?: Prisma.PostWhereInput;

    @ApiProperty()
    orderBy?: Prisma.PostOrderByWithRelationInput;
}

export class PostUpdateDTO {
    @ApiProperty()
    where: Prisma.PostWhereUniqueInput;

    @ApiProperty()
    data: Prisma.PostUpdateInput;
}
