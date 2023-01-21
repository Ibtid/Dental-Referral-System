import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
  Response,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { role } from 'src/util/constant';

// @UseGuards(JwtAuthGuard, UserRolesGuard)
// @SetMetadata('roles', [role.SUPER_ADMIN])
// @ApiBearerAuth()
@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    return await this.testService.create(createTestDto);
  }

  @Get()
  async findAll() {
    return await this.testService.findAll();
  }

  @Get('/index')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortby', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findByIndex(
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sortby') sortby: string = 'createdDate',
    @Query('order') order: string = 'desc',
    @Query('search') search: string = '',
    @Query('gender') gender: string,
    @Query('status') status: string,
  ) {
    return await this.testService.findByPagination(
      parseInt(pageNumber),
      parseInt(limit),
      sortby,
      order,
      search,
      gender,
      status,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.testService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestDto: UpdateTestDto,
  ) {
    return await this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.testService.remove(id);
  }

  @Get('/sheet/generate')
  @ApiQuery({ name: 'extension', required: false })
  @ApiQuery({ name: 'sortby', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'status', required: false })
  async generateSheet(
    @Query('extension') extension: string = 'csv',
    @Query('sortby') sortby: string = 'bio',
    @Query('order') order: string = 'asc',
    @Query('search') search: string = '',
    @Query('startDate') startDate: string = '1980-01-01',
    @Query('endDate') endDate: string = '2050-12-12',
    @Query('gender') gender: string,
    @Query('status') status: string,
  ) {
    return await this.testService.generateSheet(
      extension,
      sortby,
      order,
      search,
      gender,
      status,
      startDate,
      endDate,
    );
  }

  @Get('/pdf/generate')
  @ApiQuery({ name: 'sortby', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'status', required: false })
  async generatePdf(
    @Query('sortby') sortby: string = 'bio',
    @Query('order') order: string = 'asc',
    @Query('search') search: string = '',
    @Query('startDate') startDate: string = '1980-01-01',
    @Query('endDate') endDate: string = '2050-12-12',
    @Query('gender') gender: string,
    @Query('status') status: string,
  ) {
    return await this.testService.generatePDF(
      sortby,
      order,
      search,
      gender,
      status,
      startDate,
      endDate,
    );
  }

  @Get('/pdf/hudai')
  async hudai(@Response() res) {
    await this.testService.hudaiPdf(res);
  }
}
