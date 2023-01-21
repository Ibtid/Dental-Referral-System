import { Module } from '@nestjs/common';
import { DBService } from '../database.service';
import { Scheduler } from '../util/Scheduler/scheduler.service';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  controllers: [TestController],
  providers: [TestService, DBService, Scheduler],
  exports: [TestService],
})
export class TestModule {}
