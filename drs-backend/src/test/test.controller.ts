import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddTestDataDto } from './dto/add-test';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Post()
  async addData(@Body() addTestDataDto: AddTestDataDto) {
    return await this.testService.addData(addTestDataDto);
  }
  @Get()
  async allData() {
    return await this.testService.allData();
  }
}
