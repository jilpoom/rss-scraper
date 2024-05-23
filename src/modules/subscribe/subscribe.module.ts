import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';

@Module({
    providers: [PrismaService, SubscribeService],
    controllers: [SubscribeController],
})
export class SubscribeModule {}
