import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {
  created,
  errorhandler,
  forbidden,
  successHandler,
} from '../util/response.handler';
import { DBService } from '../database.service';
import { roles, saltOrRounds } from 'src/util/constant';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DBService) {}

  async create(
    createUserDto: CreateUserDto,
    companyId: number,
    lastModifiedBy?: number,
  ) {
    try {
      if (createUserDto.role.indexOf(`${roles.SUPER_ADMIN}`) !== -1) {
        return forbidden('Forbidden');
      }
      if (createUserDto.password !== createUserDto.confirmPassword) {
        return errorhandler(400, `password doesn't match!`);
      }
      //check for existing role
      for (let index = 0; index < createUserDto.role.length; index++) {
        const existingRole = await this.prisma.role.findFirst({
          where: {
            role: createUserDto.role[`${index}`],
          },
        });
        if (!existingRole) {
          return errorhandler(400, 'Provided role does not exist');
        }
      }
      const salt = await bcrypt.genSalt(saltOrRounds);
      const encPassword = await bcrypt.hash(createUserDto.password, salt);
      const user = await this.prisma.user.create({
        data: {
          fullName: createUserDto.fullName,
          userName: createUserDto.userName,
          email: createUserDto.email,
          role: createUserDto.role,
          phone: createUserDto.phone,
          password: encPassword,
          lastModifiedBy,
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
      const result = await this.prisma.companyUser.create({
        data: {
          companyId,
          userId: user.id,
          lastModifiedBy,
        },
        select: {
          id: true,
          companyId: true,
          user: true,
          createdDate: true,
          lastModifiedDate: true,
          lastModifiedBy: true,
        },
      });
      return created(result);
    } catch (error) {
      console.log(error);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findAll(pageNumber: number, limit: number) {
    try {
      const totalCount = await this.prisma.user.count({
        where: { isDeleted: false },
      });
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.user.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
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
      const result = await this.prisma.user.findUnique({
        where: {
          id,
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
          companyUser: {
            select: {
              companyId: true,
            },
          },
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findbyEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    lastModifiedBy: number,
  ) {
    try {
      if (updateUserDto.role) {
        if (updateUserDto.role.indexOf(`${roles.SUPER_ADMIN}`) !== -1) {
          return forbidden('Forbidden');
        }
        for (let index = 0; index < updateUserDto.role.length; index++) {
          const existingRole = await this.prisma.role.findFirst({
            where: {
              role: updateUserDto.role[`${index}`],
            },
          });
          if (!existingRole) {
            return errorhandler(400, 'Provided role does not exist');
          }
        }
      }
      const result = await this.prisma.user.update({
        data: {
          ...updateUserDto,
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
    } catch (error) {
      console.log(error);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async remove(id: number, lastModifiedBy: number) {
    try {
      const userInfo = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          role: true,
        },
      });
      if (userInfo.role.indexOf(`${roles.SUPER_ADMIN}`) !== -1) {
        return forbidden('Forbidden');
      }
      const result = await this.prisma.user.update({
        where: { id: id },
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
