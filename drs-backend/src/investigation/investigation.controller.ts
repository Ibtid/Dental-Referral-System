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
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { roles } from 'src/util/constant';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateInvestigationDto } from './dto/create-investigation.dto';
import { UpdateInvestigationDto } from './dto/update-investigation.dto';
import { InvestigationService } from './investigation.service';

@ApiTags('Investigation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('investigation')
export class InvestigationController {
  constructor(private readonly investigationService: InvestigationService) {}

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`,`${roles.COMPANY_OPERATOR}`])
  @Post()
  async create(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Body() createInvestigationDto: CreateInvestigationDto,
  ) {
    return await this.investigationService.create(
      createInvestigationDto,
      user.companyId,
      user.id,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`,`${roles.COMPANY_OPERATOR}`])
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
    return await this.investigationService.findAll(
      parseInt(pageNumber),
      parseInt(limit),
      search,
      user.companyId
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`,`${roles.COMPANY_OPERATOR}`])
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.investigationService.findOne(id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`,`${roles.COMPANY_OPERATOR}`])
  @Get('category/:category')
  async findByCategory(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('category') category: string
    ) {
    return await this.investigationService.findByCategory(category, user.companyId);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`,`${roles.COMPANY_OPERATOR}`])
  @Patch(':id')
  async update(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvestigationDto: UpdateInvestigationDto,
  ) {
    return await this.investigationService.update(
      id,
      updateInvestigationDto,
      user.id,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`,`${roles.COMPANY_OPERATOR}`])
  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.investigationService.remove(id, user.id);
  }
}
