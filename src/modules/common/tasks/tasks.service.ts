import { BadRequestException, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as console from 'node:console';
import { ReverseParseCronDTO } from './tasks.dto';

@Injectable()
export class TasksService {
    constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

    async addJob(job_name: string, cron_expression: string, onTick: () => Promise<any> | any) {
        try {
            const job = new CronJob(cron_expression, onTick);
            this.schedulerRegistry.addCronJob(job_name, job);
            job.start();

            console.log(`ADD CRON JOB : [${job_name}]`);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async deleteJob(job_name: string) {
        this.schedulerRegistry.deleteCronJob(job_name);
    }

    reverseParseCron({ minutes, hours }: ReverseParseCronDTO) {
        return `${minutes} ${hours} * * *`;
    }
}
