import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from '../posts/post.module';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '/.env',
            isGlobal: true,
        }),
        PostModule,
        UserModule,
        AuthModule,
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
