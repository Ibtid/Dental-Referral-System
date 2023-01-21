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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { UserRolesGuard } from '../auth/guards/roles.guard';
import { roles } from 'src/util/constant';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`])
  @Post()
  async create(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.userService.create(
      createUserDto,
      user.companyId,
      user.id,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`])
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return await this.userService.findAll(
      parseInt(pageNumber),
      parseInt(limit),
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`])
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Patch(':id')
  async update(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto, user.id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`])
  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.remove(id, user.id);
  }
}
