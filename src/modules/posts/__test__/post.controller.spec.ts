import { Test, TestingModule } from '@nestjs/testing';
import { Post } from '@prisma/client';
import { PostController } from '../post.controller';
import { PostService } from '../post.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DeepMockProxy, mock } from 'jest-mock-extended';
import { PostCreateDto } from '../post.dto';

describe('PostController - PostService', () => {
    let postController: PostController;
    const postServiceMock: DeepMockProxy<PostService> = mock<PostService>();
    const dum: Post[] = [
        {
            title: 'test title',
            content: 'test content',
            id: 1,
            authorId: 1,
            published: false,
        },
        {
            title: 'test title',
            content: 'test content',
            id: 2,
            authorId: 1,
            published: true,
        },
    ];

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [PostService, PrismaService],
        })
            .overrideProvider(PostService)
            .useValue(postServiceMock)
            .compile();

        postController = moduleFixture.get<PostController>(PostController);
    });

    test('getAllPosts', async () => {
        postServiceMock.posts.mockResolvedValueOnce(dum);

        expect(await postController.getAllPosts()).toBe(dum);
    });

    test('getPostById', async () => {
        postServiceMock.post.mockImplementationOnce(async ({ id }): Promise<Post> => {
            return dum.filter((d) => d.id === id)[0];
        });

        expect(await postController.getPostById('1')).toBe(dum[0]);
    });

    test('getFilteredPosts', async () => {
        postServiceMock.posts.mockResolvedValueOnce([dum[0]]);

        expect(await postController.getFilteredPosts('search')).toStrictEqual([dum[0]]);
    });

    test('createDraft', async () => {
        const new_post_dto: PostCreateDto = {
            title: 'new title',
            content: 'new content',
            authorEmail: 'new@new.com',
        };

        const new_post: Post = {
            id: 3,
            title: 'new title',
            content: 'new content',
            authorId: 2,
            published: false,
        };

        postServiceMock.createPost.mockResolvedValueOnce(new_post);
        expect(await postController.createDraft(new_post_dto)).toStrictEqual(new_post);
    });

    test('publishPost', async () => {
        const published_post: Post = {
            title: 'test title',
            content: 'test content',
            id: 2,
            authorId: 1,
            published: true,
        };

        postServiceMock.updatePost.mockResolvedValueOnce(published_post);

        expect(await postController.publishPost('1')).toStrictEqual(published_post);
    });

    test('deletePost', async () => {
        const id: string = '1';

        postServiceMock.deletePost.mockResolvedValueOnce(dum[0]);

        expect(await postController.deletePost(id)).toStrictEqual(dum[0]);
    });
});
