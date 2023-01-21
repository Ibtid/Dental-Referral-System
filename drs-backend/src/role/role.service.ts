import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import {
  errorhandler,
  successHandler,
} from '../util/response.handler';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: DBService) {}

  async findAll(pageNumber: number, limit: number) {
    try {
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.role.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          isDeleted: false,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }
}
