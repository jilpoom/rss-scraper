import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { BulkSubscribeCreateDTO, SubscribeUpdateDTO } from './subscribe.dto';

@Injectable()
export class SubscribeService {
    constructor(private readonly prisma: PrismaService) {}

    async subscribesByUser(user_id: number) {
        return this.prisma.subscribe.findMany({
            where: {
                user_id,
            },
        });
    }

    async insertSubscribes(subscribeDTOs: BulkSubscribeCreateDTO) {
        return this.prisma.subscribe.createMany({
            data: subscribeDTOs.subscribes,
        });
    }

    async updateSubscribe(subscribeDTO: SubscribeUpdateDTO) {
        const { id, ...rest } = subscribeDTO;

        return this.prisma.subscribe.update({
            where: {
                id,
            },
            data: rest,
        });
    }
}
