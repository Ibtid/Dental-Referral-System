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
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { roles } from 'src/util/constant';
import { PatientLoginDto } from './dto/patient-login.dto';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_OPERATOR}`, `${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Post()
  async create(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Body() createPatientDto: CreatePatientDto,
  ) {
    return await this.patientService.create(createPatientDto, user.companyId, user.id);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_OPERATOR}`, `${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
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
    return await this.patientService.findAll(
      parseInt(pageNumber),
      parseInt(limit),
      search,
      user.companyId
    );
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_OPERATOR}`, `${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Get('/find-patients')
  async findPatientByMobileNumber(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Query('mobile') mobile: string = '',
  ) {
    return await this.patientService.findPatientByMobileNumber(mobile, user.companyId);
  }

  @Get('/view')
  @ApiQuery({ name: 'invoiceNumber', required: true })
  @ApiQuery({ name: 'mobileNumber', required: true })
  async getPatientViewData(
    @Query('invoiceNumber') invoiceNumber: string,
    @Query('mobileNumber') mobileNumber: string,
  ) {
    return await this.patientService.getPatientViewData(
      invoiceNumber,
      mobileNumber,
    );
  }

  @Get('/report-download/:id')
  async downloadReport(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.patientService.downloadReport(
      id
    );
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_OPERATOR}`, `${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.patientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_OPERATOR}`, `${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return await this.patientService.update(id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_OPERATOR}`, `${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.patientService.remove(id);
  }

  @Post('/login')
  async login(
    @Body() patientLoginDto: PatientLoginDto,
  ) {
    return await this.patientService.patientLogin(patientLoginDto);
  }

}
