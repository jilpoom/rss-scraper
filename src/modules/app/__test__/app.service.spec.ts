import { AppService } from '../app.service';
import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';

describe('AppService', () => {
    let appService: AppService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        appService = module.get<AppService>(AppService);
    });

    test('getHello() should return "Hello World!"', () => {
        expect(appService.getHello()).toStrictEqual('Hello World!');
    });
});
