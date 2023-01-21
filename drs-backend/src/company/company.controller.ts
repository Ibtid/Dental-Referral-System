import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import path = require('path');
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { UserRolesGuard } from '../auth/guards/roles.guard';
import { roles } from 'src/util/constant';

export const storage = {
  storage: diskStorage({
    destination: './files/company-logo',
    filename: (_request, file, callback) => {
      const filename =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension = path.parse(file.originalname).ext;
      callback(undefined, `${filename}${extension}`);
    },
  }),
};
// only accessible by Super-Admin. Validation will be added soon
@ApiTags('Company')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`])
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        shortName: { type: 'string' },
        address: { type: 'string' },
        contactNumber: { type: 'string' },
        email: { type: 'string' },
        website: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        adminEmail: { type: 'string' },
        adminFullName: { type: 'string' },
        adminPhone: { type: 'string' },
        status: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', storage))
  @Post()
  async create(
    @UploadedFile() file,
    @GetUser() user: { id: number; email: string },
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return await this.companyService.create(
      createCompanyDto,
      file?.filename,
      user.id,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`])
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findAll(
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return await this.companyService.findAll(
      parseInt(pageNumber),
      parseInt(limit),
      search
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/company-profile')
  async profile(
    @GetUser() user: { id: number; email: string; companyId: number },
  ) {
    return await this.companyService.profile(user.companyId);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`])
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.findOne(id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`, `${roles.COMPANY_ADMIN}`])
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        shortName: { type: 'string' },
        address: { type: 'string' },
        contactNumber: { type: 'string' },
        email: { type: 'string' },
        website: { type: 'string' },
        status: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', storage))
  @Patch(':id')
  async update(
    @UploadedFile() file,
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(
      id,
      updateCompanyDto,
      user.id,
      file?.filename,
      user.companyId,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.SUPER_ADMIN}`])
  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.companyService.remove(id, user.id);
  }
}
