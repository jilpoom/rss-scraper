import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { PostService } from '../post.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Post as PostModel } from '@prisma/client';
import { PostSearchDTO, PostUpdateDTO } from '../post.dto';

describe('PostService', () => {
    let postService: PostService;
    let prismaServiceMock: DeepMockProxy<PrismaClient>;

    const dum: PostModel[] = [
        {
            title: 'test title',
            content: 'test content',
            id: 1,
            authorId: 1,
            published: false,
            create_at: new Date(),
        },
        {
            title: 'test title',
            content: 'test content',
            id: 2,
            authorId: 1,
            published: true,
            create_at: new Date(),
        },
    ];

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [PostService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        postService = moduleFixture.get<PostService>(PostService);
        prismaServiceMock = moduleFixture.get(PrismaService);
    });

    //TODO: PostService 유닛 테스트 코드 작성
    test('post', async () => {
        prismaServiceMock.post.findUnique.mockResolvedValueOnce(dum[0]);

        const post = await postService.post({ id: 1 });

        expect(post).toStrictEqual(dum[0]);
    });

    test('posts', async () => {
        prismaServiceMock.post.findMany.mockResolvedValueOnce(dum);

        const postSearchDTO: PostSearchDTO = {
            where: {
                OR: [
                    {
                        content: {
                            contains: 'search-keyword',
                        },
                    },
                ],
            },
        };

        const post = await postService.posts(postSearchDTO);

        expect(post).toStrictEqual(dum);
    });

    test('createPost', async () => {
        const data: Prisma.PostCreateInput = {
            title: 'test title',
            content: 'test content',
            author: {
                connect: { email: 'test@google.com' },
            },
        };

        prismaServiceMock.post.create.mockResolvedValueOnce(dum[0]);

        const new_post = await postService.createPost(data);

        expect(new_post).toStrictEqual(dum[0]);
    });

    test('updatePost', async () => {
        const postUpdateDTO: PostUpdateDTO = {
            where: { id: 1 },
            data: { published: true },
        };

        prismaServiceMock.post.update.mockResolvedValueOnce(dum[0]);

        const updated_post = await postService.updatePost(postUpdateDTO);

        expect(updated_post).toStrictEqual(dum[0]);
    });

    test('deletePost', async () => {
        const where: Prisma.PostWhereUniqueInput = {
            id: 1,
        };

        prismaServiceMock.post.delete.mockResolvedValueOnce(dum[0]);

        const deleted_post = await postService.deletePost(where);

        expect(deleted_post).toStrictEqual(dum[0]);
    });
});
