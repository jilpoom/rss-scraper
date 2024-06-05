import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

const swagger_config = new DocumentBuilder()
    .setTitle('rss-scraper')
    .setDescription('ko-newspaper rss scraper')
    .setVersion('0.1')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        },
        'access-key',
    )
    .build();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global Prefix
    app.setGlobalPrefix('v1');

    // CORS
    app.enableCors();

    // helmet
    app.use(helmet());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.xssFilter());

    // ValidationPipe
    app.useGlobalPipes(new ValidationPipe());

    if (process.env.ENV === 'dev') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('common'));
    }

    const document = SwaggerModule.createDocument(app, swagger_config);
    SwaggerModule.setup('api', app, document);

    await app.listen(+process.env.PORT! || 3000);
}

bootstrap();
