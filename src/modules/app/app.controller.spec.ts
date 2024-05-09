import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let app: AppController;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        app = moduleFixture.get<AppController>(AppController);
    });

    it('health-check should return "Hello World!"', () => {
        expect(app.checkAppHealth()).toBe('Hello World!');
    });
});
