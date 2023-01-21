import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { CompanyUsersService } from './company-users.service';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { ClinicPaymentDto } from './dto/clinic-payment.dto';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { roles } from 'src/util/constant';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('CompanyUsers')
@Controller('companyUsers')
export class CompanyUsersController {
  constructor(private readonly companyUsersService: CompanyUsersService) { }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`])
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findAll(
    @GetUser() user: { id: number; userName: string; companyId: number },
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return await this.companyUsersService.findAll(
      user.companyId,
      parseInt(pageNumber),
      parseInt(limit),
      search
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Post('/clinic-payment')
  async payment(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Body() clinicPaymentDto: ClinicPaymentDto,
  ) {
    return await this.companyUsersService.payment(
      clinicPaymentDto,
      user.companyId,
      user.id,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/referral-appointments')
  async getReferralAppointments(
    @GetUser() user: { id: number; userName: string; companyId: number },
  ) {
    return await this.companyUsersService.getReferralAppointments(
      user.companyId,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/inperson-appointments')
  async getInpersonAppointments(
    @GetUser() user: { id: number; userName: string; companyId: number },
  ) {
    return await this.companyUsersService.getInpersonAppointments(
      user.companyId,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/appointment-review')
  async getAppointmentReview(
    @GetUser() user: { id: number; userName: string; companyId: number },
  ) {
    return await this.companyUsersService.getAppointmentReview(user.companyId);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/patient-report')
  async getPatientReport(
    @GetUser() user: { id: number; userName: string; companyId: number },
  ) {
    return await this.companyUsersService.getPatientReport(user.companyId);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/income-report')
  async getIncomeReport(
    @GetUser() user: { id: number; userName: string; companyId: number },
  ) {
    return await this.companyUsersService.getIncomeReport(user.companyId);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/patient-survey')
  async getPatientSurvey(
    @GetUser() user: { id: number; userName: string; companyId: number },
  ) {
    return await this.companyUsersService.getPatientSurvey(user.companyId);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/todays-report')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getTodaysReport(
    @GetUser() user: { id: number; userName: string; companyId: number },
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return await this.companyUsersService.getTodaysReport(user.companyId, parseInt(pageNumber), parseInt(limit), search);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/accounts-report')
  async getAccountsReport(
    @GetUser() user: { id: number; email: string; companyId: number },
  ) {
    return await this.companyUsersService.getAccountsReport(user.companyId);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyUsersService.findOne(id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/due-amount/:id/:month/:year')
  async clinicPayment(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
    @Param('month', ParseIntPipe) month: number,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return await this.companyUsersService.clinicPayment(
      user.companyId,
      id,
      month,
      year,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/clinic-details/:id/:month')
  async clinicDetails(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    let numberOfMonth = 12;
    if (month < 12) {
      numberOfMonth = month;
    }
    return await this.companyUsersService.clinicDetails(
      user.companyId,
      id,
      numberOfMonth,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`])
  @Patch(':id')
  async update(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyUserDto: UpdateCompanyUserDto,
  ) {
    return await this.companyUsersService.update(
      id,
      updateCompanyUserDto,
      user.companyId,
      user.id,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`])
  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.companyUsersService.remove(id, user.id);
  }
}
