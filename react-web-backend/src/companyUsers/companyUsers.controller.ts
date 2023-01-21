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
  SetMetadata,
} from '@nestjs/common';
import { CompanyUsersService } from './companyUsers.service';
import { CreateCompanyUserDto } from './dto/create-companyUser.dto';
import { UpdateCompanyUserDto } from './dto/update-companyUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { role } from 'src/util/constant';

@ApiTags('Users')
@Controller('users')
export class CompanyUsersController {
  constructor(private readonly companyUsersService: CompanyUsersService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.SUPER_ADMIN])
  @Post('/create')
  @ApiBearerAuth()
  async create(
    @GetUser() user: { id: number; userName: string },
    @Body() createCompanyUserDto: CreateCompanyUserDto,
  ) {
    return await this.companyUsersService.create(createCompanyUserDto, user.id);
  }
  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.SUPER_ADMIN])
  @Get()
  @ApiBearerAuth()
  async findAll() {
    return await this.companyUsersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyUsersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @GetUser() user: { id: number; userName: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyUserDto: UpdateCompanyUserDto,
  ) {
    return await this.companyUsersService.update(
      id,
      updateCompanyUserDto,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.SUPER_ADMIN])
  @Delete(':id')
  @ApiBearerAuth()
  async remove(
    @GetUser() user: { id: number; userName: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.companyUsersService.remove(id, user.id);
  }
}
