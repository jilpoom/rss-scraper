import { AppModule } from '../app.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppModule', () => {
    let appModule: AppModule;

    test('should defined AppModule', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        appModule = module.get<AppModule>(AppModule);

        expect(appModule).toBeDefined();
    });
});
