import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { BulkSubscribeCreateDTO, SubscribeUpdateDTO } from './subscribe.dto';
import { TasksService } from '../common/tasks/tasks.service';
import { MessageService } from './message/message.service';
import { KakaoMessageDTO } from './message/message.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class SubscribeService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cron: TasksService,
        private readonly messageService: MessageService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async subscribesByUser(user_id: number) {
        return this.prisma.subscribe.findMany({
            where: {
                user_id,
            },
        });
    }

    async insertSubscribes(subscribeDTOs: BulkSubscribeCreateDTO) {
        await this.prisma.subscribe.createMany({
            data: subscribeDTOs.subscribes,
        });

        const subscribes = await this.subscribesByUser(subscribeDTOs.subscribes[0].user_id);

        const token_cache: string | undefined = await this.cacheManager.get(
            'kakao_token:' + subscribeDTOs.subscribes[0].user_id,
        );
        const access_token = JSON.parse(token_cache as string).access_token;

        subscribes.forEach((subscribe) => {
            const messageDTO: KakaoMessageDTO = {
                access_token,
                id: subscribe.rss_id,
            };

            this.cron.addJob(subscribe.id + '', '0/30 * * * * 1-7', async () => {
                await this.messageService.sendKakaoMessageToMe(messageDTO, subscribe.user_id);
            });
        });

        return subscribes;
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
