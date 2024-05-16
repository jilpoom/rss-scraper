import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class PostCreateDto {
    @IsNotEmpty({
        message: '제목을 입력해주세요.',
    })
    @ApiProperty()
    title: string;

    @ApiProperty()
    content?: string;

    @IsNotEmpty()
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
