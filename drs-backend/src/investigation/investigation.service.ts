import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import {
  created,
  errorhandler,
  successHandler,
} from '../util/response.handler';
import { CreateInvestigationDto } from './dto/create-investigation.dto';
import { UpdateInvestigationDto } from './dto/update-investigation.dto';

@Injectable()
export class InvestigationService {
  constructor(private readonly prisma: DBService) {}

  async create(
    createInvestigationDto: CreateInvestigationDto,
    companyId: number,
    lastModifiedBy: number,
  ) {
    try {
      const result = await this.prisma.investigation.create({
        data: {
          ...createInvestigationDto,
          companyId,
          lastModifiedBy,
        },
      });
      return created(result);
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findAll(
    pageNumber: number,
    limit: number,
    search: string,
    companyId: number,
  ) {
    try {
      const totalCount = await this.getTotalInvestigationCount(
        companyId,
        search,
      );
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.investigation.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          companyId,
          isDeleted: false,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              category: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
        orderBy: {
          createdDate: 'desc',
        },
      });
      return successHandler(
        { pageNumber, limit, totalCount, data: result },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getTotalInvestigationCount(companyId: number, search: string) {
    return await this.prisma.investigation.count({
      where: {
        companyId,
        isDeleted: false,
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            category: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
    });
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.investigation.findUnique({
        where: {
          id: id,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findByCategory(category: string, companyId: number) {
    try {
      const result = await this.prisma.investigation.findMany({
        where: {
          companyId,
          category: category,
          isDeleted: false,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async update(
    id: number,
    updateInvestigationDto: UpdateInvestigationDto,
    lastModifiedBy: number,
  ) {
    try {
      const result = await this.prisma.investigation.update({
        where: {
          id: id,
        },
        data: {
          ...updateInvestigationDto,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async remove(id: number, lastModifiedBy: number) {
    try {
      const result = await this.prisma.investigation.update({
        where: {
          id: id,
        },
        data: {
          isDeleted: true,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }
}
