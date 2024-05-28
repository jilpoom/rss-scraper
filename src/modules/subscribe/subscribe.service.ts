import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { BulkSubscribeCreateDTO, SubscribeUpdateDTO } from './subscribe.dto';
import { TasksService } from '../common/tasks/tasks.service';
import { MessageService } from './message/message.service';
import { KakaoMessageDTO } from './message/message.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class SubscribeService implements OnModuleInit {
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
            data: subscribeDTOs.subscribes.map((subscribe) => {
                const { cron, ...rest } = subscribe;
                return {
                    cron: this.cron.reverseParseCron(cron),
                    ...rest,
                };
            }),
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

            this.cron.addJob(subscribe.id + '', subscribe.cron, async () => {
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
            data: {
                cron: this.cron.reverseParseCron(rest.cron),
                user_id: rest.user_id,
                rss_id: rest.rss_id,
            },
        });
    }

    async onModuleInit() {
        const subscribes = await this.prisma.subscribe.findMany({
            select: {
                user_id: true,
                rss_id: true,
                cron: true,
            },
        });

        console.log(subscribes);

        const tokens = await this.prisma.token.findMany({
            where: {
                user_id: {
                    in: subscribes.map((s) => s.user_id),
                },
            },
        });

        console.log(tokens);

        return;
    }
}
