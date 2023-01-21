import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  SetMetadata,
  Request,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { roles } from 'src/util/constant';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtClinicTokenGuard } from '../auth/guards/jwt-clinic.guard';
import { ClinicService } from './clinic.service';
import { ClinicLoginDto } from './dto/clinic-login.dto';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@ApiTags('Clinic')
@ApiBearerAuth()
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Post()
  async create(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Body() createClinicDto: CreateClinicDto,
  ) {
    return await this.clinicService.createPartnership(
      createClinicDto,
      user.id,
      user.companyId,
    );
  }

  @Post('/login')
  async login(@Body() clinicLoginDto: ClinicLoginDto) {
    return await this.clinicService.login(clinicLoginDto.mobile);
  }

  @Get('/verify')
  async verify(@Query('mobile') mobile: string, @Query('code') code: string, @Request() req, @Response({ passthrough: true }) res ) {
    return await this.clinicService.verify(mobile, code, req, res);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findAll(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return await this.clinicService.findAll(
      parseInt(pageNumber),
      parseInt(limit),
      search,
      user.companyId,
    );
  }

  @UseGuards(JwtClinicTokenGuard)
  @Get('/profile')
  async profile(
    @GetUser() user: { sub: number; mobile: string },
  ) {
    return await this.clinicService.profile(user.sub);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clinicService.findOne(id);
  }

  @UseGuards(JwtClinicTokenGuard)
  @ApiBearerAuth()
  @Get('/table/payment')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async paymentTable(
    @GetUser() user: { sub: number; mobile: string },
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return await this.clinicService.paymentTable(
      user.sub,
      parseInt(pageNumber),
      parseInt(limit),
      search,
    );
  }
  @UseGuards(JwtClinicTokenGuard)
  @ApiBearerAuth()
  @Get('/table/patient')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async patientTable(
    @GetUser() user: { sub: number; mobile: string },
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return await this.clinicService.patientTable(
      user.sub,
      parseInt(pageNumber),
      parseInt(limit),
      search,
    );
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClinicDto: UpdateClinicDto,
  ) {
    return await this.clinicService.update(
      id,
      updateClinicDto,
      user.companyId,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.clinicService.remove(id, user.companyId, user.id);
  }

  @UseGuards(JwtClinicTokenGuard)
  @ApiBearerAuth()
  @Get('/cards/data')
  async getCardData(@GetUser() user: { sub: number; mobile: string }) {
    return await this.clinicService.getCardData(user.sub);
  }

  @UseGuards(JwtClinicTokenGuard)
  @ApiBearerAuth()
  @Get('/line/data')
  async getLineChartData(@GetUser() user: { sub: number; mobile: string }) {
    return await this.clinicService.getLineChartData(user.sub);
  }
}
