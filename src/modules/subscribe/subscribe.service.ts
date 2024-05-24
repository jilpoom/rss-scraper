import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { BulkSubscribeCreateDTO, SubscribeUpdateDTO } from './subscribe.dto';
import { TasksService } from '../common/tasks/tasks.service';
import { MessageService } from './message/message.service';
import { KakaoMessageDTO } from './message/message.dto';

@Injectable()
export class SubscribeService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cron: TasksService,
        private readonly messageService: MessageService,
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

        subscribes.forEach((subscribe) => {
            //TODO: access_token, refresh_token 저장 및 cron_parser 구현
            const messageDTO: KakaoMessageDTO = {
                access_token: 'WYVqgTvplPwyUPHMdbvSq_V7c1pOItTyAAAAAQopyNoAAAGPqPJ3A8O6S6yUo1la',
                id: subscribe.rss_id,
            };
            this.cron.addJob(subscribe.id + '', '0/10 * * * * 1-5', async () => {
                await this.messageService.sendKakaoMessageToMe(messageDTO);
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
