import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import * as bcrypt from 'bcrypt';
import {
  created,
  errorhandler,
  successHandler,
} from '../util/response.handler';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { roles, saltOrRounds } from '../util/constant';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { sendMailTest } from '../util/send-mail';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: DBService) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    filename: string,
    lastModifiedBy: number,
  ) {
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        const createCompany = await prisma.company.create({
          data: {
            name: createCompanyDto.name,
            shortName: createCompanyDto.shortName,
            address: createCompanyDto.address,
            contactNumber: createCompanyDto.contactNumber,
            email: createCompanyDto.email,
            logoPath: filename ? `files/company-logo/${filename}` : null,
            website: createCompanyDto.website,
            lastModifiedBy,
          },
        });
        const salt = await bcrypt.genSalt(saltOrRounds);
        const encPassword = await bcrypt.hash(createCompanyDto.password, salt);
        const createUser = await prisma.user.create({
          data: {
            fullName: createCompanyDto.adminFullName,
            userName: createCompanyDto.username,
            email: createCompanyDto.adminEmail,
            role: [`${roles.COMPANY_ADMIN}`],
            phone: createCompanyDto.adminPhone,
            password: encPassword,
            lastModifiedBy,
          },
        });
        await prisma.companyUser.create({
          data: {
            companyId: createCompany.id,
            userId: createUser.id,
            lastModifiedBy,
          },
        });

        let emailConfig = {
          receiver: createCompanyDto.adminEmail,
          subject: 'DRS Login Credentials',
          textContent: 'Welcome to DRS',
          htmlContent: `<p>Dear ${createCompanyDto.username}</p>
            <p>We have registered your Diagnostic center <b>${createCompanyDto.name}</b></p>
            <p>Here is your login credentials</p>
            <div>
              email: <b>${createCompanyDto.adminEmail}</b>
              <br/>
              password: <b>${createCompanyDto.password}</b>
            </div>
        `,
        };
        await sendMailTest(emailConfig);
        return createCompany;
      });

      return created(result);
    } catch (error) {
      if (filename) {
        fs.unlink(
          path.join(path.resolve('./files/company-logo'), filename),
          (error_) => {
            if (error_) {
              console.log(error_);
              throw error_;
            }
          },
        );
      }
      console.log(error.message);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findAll(pageNumber: number, limit: number, search: string) {
    try {
      const totalCount = await this.getTotalCompanyCount(search);
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.company.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          isDeleted: false,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              shortName: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
            {
              address: {
                contains: search,
              },
            },
            {
              contactNumber: {
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

  async getTotalCompanyCount(search: string) {
    return await this.prisma.company.count({
      where: {
        isDeleted: false,
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            shortName: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            address: {
              contains: search,
            },
          },
          {
            contactNumber: {
              contains: search,
            },
          },
        ],
      },
    });
  }

  async profile(id: number) {
    return await this.findOne(id);
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.company.findUnique({
        where: {
          id: id,
        },
        include: {
          user: true,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    lastModifiedBy: number,
    filename: string,
    companyId: number,
  ) {
    try {
      const companyToUpdate = await this.prisma.company.findUnique({
        where: {
          id: id,
        },
      });

      if (companyId && companyId !== id) {
        return errorhandler(400, 'Forbidden');
      }

      if (filename && companyToUpdate.logoPath) {
        fs.unlink(companyToUpdate.logoPath, function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log('File deleted!');
        });
      }

      const result = await this.prisma.company.update({
        where: {
          id: id,
        },
        data: {
          name: updateCompanyDto.name
            ? updateCompanyDto.name
            : companyToUpdate.name,
          shortName: updateCompanyDto.shortName
            ? updateCompanyDto.shortName
            : companyToUpdate.shortName,
          address: updateCompanyDto.address
            ? updateCompanyDto.address
            : companyToUpdate.address,
          contactNumber: updateCompanyDto.contactNumber
            ? updateCompanyDto.contactNumber
            : companyToUpdate.contactNumber,
          email: updateCompanyDto.email
            ? updateCompanyDto.email
            : companyToUpdate.email,
          website: updateCompanyDto.website
            ? updateCompanyDto.website
            : companyToUpdate.website,
          status: updateCompanyDto.status
            ? updateCompanyDto.status
            : companyToUpdate.status,
          logoPath: filename
            ? `files/company-logo/${filename}`
            : companyToUpdate.logoPath,
          lastModifiedBy,
          lastModifiedDate: new Date(),
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
      const result = await this.prisma.company.update({
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
