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
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { UserRolesGuard } from 'src/auth/guards/roles.guard';
import { roles } from 'src/util/constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

export const reportStorage = {
  storage: diskStorage({
    destination: './files/exports',
    filename: (_request, file, callback) => {
      const filename =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension = path.parse(file.originalname).ext;
      callback(undefined, `${filename}${extension}`);
      console.log(extension);
    },
  }),
};

@ApiTags('Invoice')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_OPERATOR}`, `${roles.COMPANY_ADMIN}`])
  @Post()
  async create(
    @GetUser() user: { id: number; userName: string; companyId: number },
    @Body() createInvoiceDto: CreateInvoiceDto,
  ) {
    return await this.invoiceService.create(
      createInvoiceDto,
      user.id,
      user.companyId,
    );
  }

  @UseGuards(UserRolesGuard)
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
    return await this.invoiceService.findAll(
      parseInt(pageNumber),
      parseInt(limit),
      search,
      user.companyId,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/finances')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getFinances(
    @GetUser() user: { id: number; email: string; companyId: number },
    @Query('page') pageNumber: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return await this.invoiceService.getFinancesByCompanyId(
      parseInt(pageNumber),
      parseInt(limit),
      search,
      user.companyId,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.invoiceService.findOne(id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Patch('/duepayment/:id')
  async update(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return await this.invoiceService.update(id, updateInvoiceDto, user.id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', reportStorage))
  @Patch('/upload/report/:invoiceInvestigationId')
  async updateInvoiceInvestigation(
    @UploadedFile() file,
    @GetUser() user: { id: number; email: string; companyId: number },
    @Param('invoiceInvestigationId', ParseIntPipe)
    invoiceInvestigationId: number,
  ) {
    return await this.invoiceService.uploadInvoiceInvestigationReport(
      invoiceInvestigationId,
      file.filename,
      user.id,
    );
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Get('/download/file/:id')
  async downloadFile(@Param('id', ParseIntPipe) id: number) {
    return await this.invoiceService.downloadFile(id);
  }

  @Get('/print/:id')
  async print(@Param('id', ParseIntPipe) id: number) {
    return await this.invoiceService.printInvoice(id);
  }

  @UseGuards(UserRolesGuard)
  @SetMetadata('roles', [`${roles.COMPANY_ADMIN}`, `${roles.COMPANY_OPERATOR}`])
  @Delete(':id')
  async remove(
    @GetUser() user: { id: number; email: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.invoiceService.remove(id, user.id);
  }
}
