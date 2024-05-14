import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PostService } from '../post.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('PostController', () => {
    let postService: PostService;
    let mockPrisma: DeepMockProxy<PrismaClient>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [PostService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        postService = moduleFixture.get<PostService>(PostService);
        mockPrisma = moduleFixture.get(PrismaService);
    });

    //TODO: PostService 유닛 테스트 코드 작성
    it('dummy', () => {});
});
