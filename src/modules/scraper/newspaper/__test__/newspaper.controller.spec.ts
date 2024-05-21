import { Test, TestingModule } from '@nestjs/testing';
import { NewspaperController } from '../newspaper.controller';
import { NewspaperService } from '../newspaper.service';
import { RssService } from '../rss/rss.service';
import { DeepMockProxy, mock } from 'jest-mock-extended';
import { Newspaper, Rss } from '@prisma/client';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { NewspaperCreateDTO, NewspaperUpdateDTO } from '../newspaper.dto';
import { RSSCreateDTO, RSSUpdateDTO } from '../rss/rss.dto';

describe('NewspaperController', () => {
    let newspaperController: NewspaperController;
    let newspaperServiceMock: DeepMockProxy<NewspaperService>;
    let rssServiceMock: DeepMockProxy<RssService>;

    const newspaper_dum: Newspaper[] = [
        {
            id: 1,
            name: '매일경제',
            create_at: new Date(),
        },
    ];

    const rss_dum: Rss[] = [
        {
            id: 1,
            url: 'http://random.foo.bar',
            create_at: new Date(),
            category: '헤드라인',
            newspaper_id: 1,
        },
    ];

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [NewspaperController],
            providers: [NewspaperService, RssService, PrismaService],
        })
            .overrideProvider(NewspaperService)
            .useValue(mock<NewspaperService>())
            .overrideProvider(RssService)
            .useValue(mock<RssService>())
            .compile();

        newspaperController = moduleFixture.get<NewspaperController>(NewspaperController);
        newspaperServiceMock = moduleFixture.get(NewspaperService);
        rssServiceMock = moduleFixture.get(RssService);
    });

    test('getAllNewspapers', async () => {
        newspaperServiceMock.newspapers.mockResolvedValueOnce(newspaper_dum);

        expect(await newspaperController.getAllNewspapers()).toBe(newspaper_dum);
    });

    test('getAllRss', async () => {
        rssServiceMock.rsses.mockResolvedValueOnce(rss_dum);

        expect(await newspaperController.getAllRss()).toBe(rss_dum);
    });

    test('getOneNewspaper', async () => {
        newspaperServiceMock.newspaper.mockResolvedValueOnce(newspaper_dum[0]);

        expect(await newspaperController.getOneNewspaper('1')).toBe(newspaper_dum[0]);
    });

    test('getAllRssByNewspaper', async () => {
        rssServiceMock.findAllRssByNewsPaper.mockResolvedValueOnce(rss_dum);

        expect(await newspaperController.getAllRssByNewspaper('1')).toBe(rss_dum);
    });

    test('createNewspaper', async () => {
        const newspaperDTO: NewspaperCreateDTO = {
            name: 'new newspaper',
        };

        newspaperServiceMock.create.mockResolvedValueOnce(newspaper_dum[0]);

        expect(await newspaperController.createNewspaper(newspaperDTO)).toBe(newspaper_dum[0]);
    });

    test('createRss', async () => {
        const rssDTO: RSSCreateDTO = {
            newspaper_id: '1',
            url: 'http://random.foo.bar',
            category: 'new category',
        };

        rssServiceMock.create.mockResolvedValueOnce(rss_dum[0]);

        expect(await newspaperController.createRss(rssDTO)).toBe(rss_dum[0]);
    });

    test('updateNewspaper', async () => {
        const newspaperDTO: NewspaperUpdateDTO = {
            id: '1',
            name: 'updated newspaper name',
        };

        newspaperServiceMock.update.mockResolvedValueOnce(newspaper_dum[0]);

        expect(await newspaperController.updateNewspaper(newspaperDTO)).toBe(newspaper_dum[0]);
    });

    test('updateRss', async () => {
        const rssDTO: RSSUpdateDTO = {
            id: '1',
            url: 'http://random.foo.bar',
            category: 'updated_category',
        };

        rssServiceMock.update.mockResolvedValueOnce(rss_dum[0]);

        expect(await newspaperController.updateRss(rssDTO)).toBe(rss_dum[0]);
    });

    test('deleteNewspaper', async () => {
        newspaperServiceMock.delete.mockResolvedValueOnce(newspaper_dum[0]);

        expect(await newspaperController.deleteNewspaper('1')).toBe(newspaper_dum[0]);
    });

    test('deleteRss', async () => {
        rssServiceMock.delete.mockResolvedValueOnce(rss_dum[0]);

        expect(await newspaperController.deleteRss('1')).toBe(rss_dum[0]);
    });
});
