import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { role } from 'src/util/constant';
@ApiTags('Role')
@UseGuards(JwtAuthGuard, UserRolesGuard)
@SetMetadata('roles', [role.SUPER_ADMIN])
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post()
  async create(
    @GetUser() user: { id: number; userName: string },
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return await this.roleService.create(createRoleDto, user.id);
  }
  // @hasRoles('admin')
  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', 'super-admin')
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.findOne(id);
  }
  @Patch(':id')
  async update(
    @GetUser() user: { id: number; userName: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.roleService.update(id, updateRoleDto, user.id);
  }
  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; userName: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.roleService.remove(id, user.id);
  }
  @Get(':pageNumber/:limit')
  async findRolesFromSelectedPage(
    @Param('pageNumber', ParseIntPipe) pageNumber: number,
    @Param('limit', ParseIntPipe) limit: number,
  ) {
    return await this.roleService.findRolesFromSelectedPage(pageNumber, limit);
  }
}
