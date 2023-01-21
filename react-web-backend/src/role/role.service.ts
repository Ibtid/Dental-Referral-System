import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DBService } from 'src/db.service';
import {
  created,
  errorhandler,
  successHandler,
} from 'src/util/response.handler';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
@Injectable()
export class RoleService {
  constructor(private readonly prisma: DBService) {}
  async create(createRoleDto: CreateRoleDto, lastModifiedBy: number) {
    try {
      const result = await this.prisma.role.create({
        data: {
          ...createRoleDto,
          lastModifiedBy,
        },
      });
      return created(result);
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }
  async findAll() {
    try {
      const result = await this.prisma.role.findMany({
        where: {
          isDeleted: false,
        },
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }
  async findOne(id: number) {
    try {
      const result = await this.prisma.role.findUnique({
        where: {
          id: id,
        },
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }
  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
    lastModifiedBy: number,
  ) {
    try {
      const result = await this.prisma.role.update({
        data: {
          ...updateRoleDto,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
        where: {
          id: id,
        },
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }
  async remove(id: number, lastModifiedBy) {
    try {
      const result = await this.prisma.role.update({
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
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }
  async findRolesFromSelectedPage(pageNumber: number, limit: number) {
    try {
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.role.findMany({
        where: {
          isDeleted: false,
        },
        skip: needToSkip,
        take: limit,
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }
}
