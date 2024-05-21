import { Prisma } from '@prisma/client';

export class NewspaperCreateDTO {
    name: string;
}

export class NewspaperUpdateDTO {
    where: Prisma.NewspaperWhereUniqueInput;
    data: Prisma.NewspaperUpdateInput;
}
