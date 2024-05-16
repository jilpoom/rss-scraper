import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { User as UserModel } from '.prisma/client';
import { UserCreateDTO, UserSearchDTO, UserUpdateDTO } from '../user.dto';

describe('UserService', () => {
    let userService: UserService;
    let bcrytServiceMock: DeepMockProxy<BcryptService>;
    let prismaServiceMock: DeepMockProxy<PrismaClient>;
    const dum: UserModel[] = [
        {
            id: 1,
            name: 'JJY',
            email: 'JJY@google.com',
            password: '1234',
        },
        {
            id: 2,
            name: 'KKY',
            email: 'KKY@google.com',
            password: '2345',
        },
    ];

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, PrismaService, BcryptService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .overrideProvider(BcryptService)
            .useValue(mockDeep<BcryptService>())
            .compile();

        userService = module.get<UserService>(UserService);
        bcrytServiceMock = module.get(BcryptService);
        prismaServiceMock = module.get(PrismaService);
    });

    describe('user', () => {
        test('user function return one user', async () => {
            const id = 1;

            prismaServiceMock.user.findUnique.mockResolvedValueOnce(dum[0]);

            const user = await userService.user({ id });

            expect(user).toBeDefined();
            expect(user).toStrictEqual(dum[0]);
        });

        test("if user doesn't existed, throw Error", async () => {
            const id = 12345;

            prismaServiceMock.user.findUnique.mockResolvedValueOnce(null);

            await expect(userService.user({ id })).rejects.toThrow('해당 user가 없습니다.');
        });
    });

    test('users', async () => {
        const params: UserSearchDTO = {
            where: {
                OR: [
                    {
                        name: {
                            contains: 'search-keywords',
                        },
                    },
                ],
            },
        };

        prismaServiceMock.user.findMany.mockResolvedValueOnce(dum);

        const user = await userService.users(params);

        expect(user).toStrictEqual(dum);
    });

    describe('createUser', () => {
        test('createUser should return new User', async () => {
            const data: UserCreateDTO = {
                name: 'JJY',
                email: 'jjy@gmail.com',
                password: 'password',
            };

            prismaServiceMock.user.create.mockResolvedValueOnce(dum[0]);
            bcrytServiceMock.hash.mockResolvedValueOnce('hashed_password');

            const new_user = await userService.createUser(data);

            expect(new_user).toStrictEqual(dum[0]);
        });

        test('if password was falsy, throw Exception', async () => {
            const data: UserCreateDTO = {
                name: 'JJY',
                email: 'jjy@gmail.com',
                password: '',
            };

            await expect(userService.createUser(data)).rejects.toThrow('패스워드를 입력해주세요');
        });
    });

    describe('updateUser', () => {
        test('updateUser should return updated User', async () => {
            const data: UserUpdateDTO = {
                where: {
                    id: 1,
                },
                data: {
                    password: '1234',
                },
            };

            prismaServiceMock.user.update.mockResolvedValueOnce(dum[0]);
            bcrytServiceMock.hash.mockResolvedValueOnce('hashed_password');

            const updated_user = await userService.updateUser(data);

            expect(updated_user).toStrictEqual(dum[0]);
        });

        test('if password was falsy, throw Exception', async () => {
            const data: UserUpdateDTO = {
                where: {
                    id: 1,
                },
                data: {
                    password: '',
                },
            };

            await expect(userService.updateUser(data)).rejects.toThrow('패스워드를 입력해주세요');
        });
    });

    test('deleteUser', async () => {
        const id: Prisma.UserWhereUniqueInput = {
            id: 1,
        };

        prismaServiceMock.user.delete.mockResolvedValueOnce(dum[0]);

        const deleted_user = await userService.deleteUser(id);

        expect(deleted_user).toStrictEqual(dum[0]);
    });
});
