import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import {
  created,
  errorhandler,
  successHandler,
} from '../util/response.handler';
import { Scheduler } from '../util/Scheduler/scheduler.service';
import { AddTestDataDto } from './dto/add-test';

@Injectable()
export class TestService {
  constructor(
    private readonly scheduler: Scheduler,
    private readonly prisma: DBService,
  ) {}
  async addData(addTestDataDto: AddTestDataDto) {
    try {
      const result = await this.prisma.test.create({
        data: {
          investigationAmount: addTestDataDto.investigationAmount,
        },
      });
      await this.scheduler.start(() => this.removeData(result.id));
      return created(result);
    } catch (error) {
      return errorhandler(400, error.message);
    }
  }

  async allData() {
    try {
      const test = await this.prisma.test.findMany();
      return successHandler(test, 'Success');
    } catch (error) {
      return errorhandler(400, error.message);
    }
  }

  async removeData(id: number) {
    try {
      console.log('deleting....');
      return await this.prisma.test.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
