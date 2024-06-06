import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from '../users/posts/post.module';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ScraperModule } from '../scraper/scraper.module';
import { APP_PIPE } from '@nestjs/core';
import { MessageModule } from '../subscribe/message/message.module';
import { SubscribeModule } from '../subscribe/subscribe.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { CustomConfigService } from '../../config/custom-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '/.env',
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        CacheModule.register({
            isGlobal: true,
        }),
        PostModule,
        UserModule,
        AuthModule,
        ScraperModule,
        MessageModule,
        SubscribeModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
