import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import {
  created,
  errorhandler,
  successHandler,
} from '../util/response.handler';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: DBService) {}

  async create(createDoctorDto: CreateDoctorDto, lastModifiedBy: number) {
    try {
      const result = await this.prisma.doctor.create({
        data: {
          ...createDoctorDto,
          lastModifiedBy,
        },
      });
      return created(result);
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findAll(pageNumber: number, limit: number) {
    try {
      const totalCount = await this.prisma.doctor.count({
        where: { isDeleted: false },
      });
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.doctor.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          isDeleted: false,
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

  async findOne(id: number) {
    try {
      const result = await this.prisma.doctor.findUnique({
        where: {
          id: id,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async update(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
    lastModifiedBy: number,
  ) {
    try {
      const result = await this.prisma.doctor.update({
        where: {
          id: id,
        },
        data: {
          ...updateDoctorDto,
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
      const result = await this.prisma.doctor.update({
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
