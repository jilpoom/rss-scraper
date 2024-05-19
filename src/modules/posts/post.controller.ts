import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { PostCreateDto } from './post.dto';

@ApiTags('posts')
@Controller('/posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('/')
    async getAllPosts(): Promise<PostModel[]> {
        return this.postService.posts({});
    }

    @Get('post/:id')
    async getPostById(@Param('id') id: string): Promise<PostModel | null> {
        return this.postService.post({ id: +id });
    }

    @Get('filtered-posts/:searchString')
    async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
        return this.postService.posts({
            where: {
                OR: [
                    {
                        title: { contains: searchString },
                    },
                    {
                        content: { contains: searchString },
                    },
                ],
            },
        });
    }

    @Post('post')
    async createDraft(@Body() postData: PostCreateDto): Promise<PostModel> {
        const { title, content, authorEmail } = postData;
        return this.postService.createPost({
            title,
            content,
            author: {
                connect: { email: authorEmail },
            },
        });
    }

    @Put('publish/:id')
    async publishPost(@Param('id') id: string): Promise<PostModel> {
        return this.postService.updatePost({
            where: { id: Number(id) },
            data: { published: true },
        });
    }

    @Delete('post/:id')
    async deletePost(@Param('id') id: string): Promise<PostModel> {
        return this.postService.deletePost({ id: Number(id) });
    }
}