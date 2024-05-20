import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { NewspaperController } from './newspaper/newspaper.controller';
import { PrismaService } from '../common/prisma/prisma.service';
import { NewspaperService } from './newspaper/newspaper.service';
import { NewspaperModule } from './newspaper/newspaper.module';

@Module({
    imports: [NewspaperModule],
    providers: [ScraperService, PrismaService, NewspaperService],
    controllers: [ScraperController, NewspaperController],
})
export class ScraperModule {}