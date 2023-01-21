import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctor')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(
    @GetUser() user: { id: number; email: string },
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return await this.doctorService.create(createDoctorDto, user.id);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.doctorService.findAll(parseInt(pageNumber), parseInt(limit));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.doctorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorService.update(id, updateDoctorDto, user.id);
  }

  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.doctorService.remove(id, user.id);
  }
}
