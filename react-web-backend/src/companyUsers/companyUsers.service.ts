import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { CompanyUser } from '@prisma/client';
import { CreateCompanyUserDto } from './dto/create-companyUser.dto';
import * as bcrypt from 'bcrypt';
import {
  created,
  errorhandler,
  successHandler,
} from 'src/util/response.handler';
import { UpdateCompanyUserDto } from './dto/update-companyUser.dto';
import { role, saltOrRounds } from '../util/constant';
@Injectable()
export class CompanyUsersService {
  constructor(private readonly prisma: DBService) {}
  async create(
    createCompanyUserDto: CreateCompanyUserDto,
    lastModifiedBy: number,
  ) {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltOrRounds);
    const encPassword = await bcrypt.hash(createCompanyUserDto.password, salt);
    try {
      const existingRole = await this.prisma.role.findFirst({
        where: {
          role: createCompanyUserDto.role,
        },
      });
      if (!existingRole) {
        return errorhandler(400, 'Provided role does not exist');
      }
      const result = await this.prisma.companyUser.create({
        data: {
          ...createCompanyUserDto,
          password: encPassword,
          lastModifiedBy,
        },
        select: {
          // Since we return only 5 fields, we need to set return type partial
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
        },
      });
      return created(result);
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.companyUser.findMany({
        where: { isDeleted: false },
        select: {
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
        },
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.companyUser.findUnique({
        where: { id: id },
        select: {
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
        },
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async findbyUserName(name: string): Promise<Partial<CompanyUser>> | null {
    return await this.prisma.companyUser.findUnique({
      where: { userName: name },
    });
  }

  async update(
    id: number,
    updateCompanyUserDto: UpdateCompanyUserDto,
    lastModifiedBy: number,
  ) {
    try {
      if (updateCompanyUserDto.role) {
        const existingRole = await this.prisma.role.findFirst({
          where: {
            role: updateCompanyUserDto.role,
          },
        });
        if (!existingRole) {
          return errorhandler(400, 'Provided role does not exist');
        }
      }
      const result = await this.prisma.companyUser.update({
        data: {
          ...updateCompanyUserDto,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
        where: {
          id: id,
        },
        select: {
          id: true,
          fullName: true,
          userName: true,
          role: true,
          phone: true,
          email: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
        },
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async remove(id: number, lastModifiedBy: number) {
    try {
      const result = await this.prisma.companyUser.update({
        where: { id: id },
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
}
