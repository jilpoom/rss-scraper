import { AuthController } from '../auth.controller';
import { DeepMockProxy, mock } from 'jest-mock-extended';
import { AuthService } from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../modules/users/user.service';
import { PrismaService } from '../../modules/common/prisma/prisma.service';
import { AuthGuard } from '../auth.guard';
import { BcryptService } from '../../modules/users/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { SignInDTO } from '../auth.dto';

describe('AuthController', () => {
    let authController: AuthController;
    const authServiceMock: DeepMockProxy<AuthService> = mock<AuthService>();
    const access_token = 'RandomString';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    global: true,
                    secret: process.env.JWT_SECRET_KEY,
                    signOptions: { expiresIn: '60s' },
                }),
            ],
            controllers: [AuthController],
            providers: [AuthService, UserService, PrismaService, AuthGuard, BcryptService],
        })
            .overrideProvider(AuthService)
            .useValue(authServiceMock)
            .compile();

        authController = moduleFixture.get<AuthController>(AuthController);
    });

    test('signIn', async () => {
        authServiceMock.signIn.mockResolvedValueOnce({ access_token });

        const userLoginDTO: SignInDTO = {
            email: 'name@google.com',
            password: '1234',
        };

        const result = await authController.signIn(userLoginDTO);

        expect(result).toStrictEqual({ access_token });
    });
});
