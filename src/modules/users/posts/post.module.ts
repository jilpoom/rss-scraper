import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService, PrismaService],
})
export class PostModule {}
