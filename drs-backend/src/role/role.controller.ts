import {
  Controller,
  Get,
  UseGuards,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRolesGuard } from '../auth/guards/roles.guard';
import { roles } from 'src/util/constant';

@ApiTags('Role')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`,`${roles.COMPANY_ADMIN}`])
  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return await this.roleService.findAll(
      parseInt(pageNumber),
      parseInt(limit),
    );
  }
}
