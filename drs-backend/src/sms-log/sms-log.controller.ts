import { Controller, Get, UseGuards, SetMetadata, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRolesGuard } from '../auth/guards/roles.guard';
import { roles } from '../util/constant';
import { SmsLogService } from './sms-log.service';

@ApiTags('smsLog')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('sms-log')
export class SmsLogController {
  constructor(private readonly smsLogService: SmsLogService) {}

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`,`${roles.COMPANY_OPERATOR}`])
  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'smsType', required: false })
  async findManyUsingCompanyId(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('smsType') smsType: string,
  ) {
    return await this.smsLogService.findManyUsingCompanyId(
      user.companyId,
      smsType,
      parseInt(pageNumber),
      parseInt(limit),
    );
  }
}
