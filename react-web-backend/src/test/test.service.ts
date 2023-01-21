import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { bufferToStream, exportExcel, exportPDF } from 'src/util/exportFiles';
import {
  created,
  errorhandler,
  successHandler,
} from 'src/util/response.handler';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
const path = require('path');
const fs = require('fs');
var pdf = require('pdf-creator-node');

@Injectable()
export class TestService {
  constructor(private readonly prisma: DBService) {}
  async create(createTestDto: CreateTestDto) {
    try {
      const result = await this.prisma.test.create({
        data: {
          ...createTestDto,
        },
      });
      return created(result);
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.test.findMany();
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async findByPagination(
    pageNumber: number,
    limit: number,
    sortby: string,
    order: string,
    search: string,
    gender: string,
    status: string,
  ) {
    try {
      const needToSkip = (pageNumber - 1) * limit;
      const totalCount = await this.getCount(
        gender,
        search,
        sortby,
        order,
        status,
      );
      const data = await this.getFilteredData(
        needToSkip,
        limit,
        gender,
        search,
        sortby,
        order,
        status,
      );
      const result = {
        pageNumber,
        limit,
        totalCount,
        data,
      };
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async getCount(
    gender: string,
    search: string,
    sortby: string,
    order: string,
    status: string,
  ) {
    const count = await this.prisma.test.count({
      where: {
        gender: gender || undefined,
        status: status || undefined,
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            bio: {
              contains: search,
            },
          },
        ],
      },
      orderBy: {
        [sortby]: order,
      },
    });
    return count;
  }

  async getFilteredData(
    needToSkip: number,
    limit: number,
    gender: string,
    search: string,
    sortby: string,
    order: string,
    status: string,
  ) {
    const data = await this.prisma.test.findMany({
      where: {
        gender: gender || undefined,
        status: status || undefined,
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            bio: {
              contains: search,
            },
          },
        ],
      },
      orderBy: {
        [sortby]: order,
      },
      skip: needToSkip || 0,
      take: limit || 10,
    });
    return data;
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.test.findUnique({
        where: {
          id,
        },
      });
      return successHandler(result, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    try {
      const result = await this.prisma.test.update({
        where: {
          id,
        },
        data: {
          ...updateTestDto,
        },
      });
      return created(result);
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.test.delete({
        where: {
          id,
        },
      });
      return successHandler({}, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async generateSheet(
    extension: string,
    sortby: string,
    order: string,
    search: string,
    gender: string,
    status: string,
    startDate: string,
    endDate: string,
  ) {
    let tests;
    try {
      tests = await this.prisma.test.findMany({
        where: {
          gender: gender || undefined,
          status: status || undefined,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              bio: {
                contains: search,
              },
            },
          ],
          createdDate: {
            gte: new Date(startDate), //YY-MM-DD
            lte: new Date(endDate), //YY-MM-DD
          },
        },
        orderBy: {
          [sortby]: order,
        },
      });
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }

    const workSheetColumnNames = [
      'ID',
      'Name',
      'Age',
      'Gender',
      'Status',
      'Bio',
      'Created Date',
    ];
    const workSheetName = 'Tests';

    const data = tests.map((test) => {
      return [
        test.id,
        test.name,
        test.age,
        test.gender,
        test.status,
        test.bio,
        test.createdDate,
      ];
    });

    const base64 = exportExcel(
      data,
      workSheetColumnNames,
      workSheetName,
      extension,
    );
    return successHandler({ base64 }, 'Success');
  }

  async downloadTestFile(res, relativePath) {
    const absolutePath = path.resolve(relativePath);
    res.download(absolutePath, (err) => {
      if (err) {
        return errorhandler(400, JSON.stringify(err.message));
      }
    });
  }

  async generatePDF(
    sortby: string,
    order: string,
    search: string,
    gender: string,
    status: string,
    startDate: string,
    endDate: string,
  ) {
    var html = fs.readFileSync('./src/templates/pdf/testlist.html', 'utf8');
    let tests;
    try {
      tests = await this.prisma.test.findMany({
        where: {
          gender: gender || undefined,
          status: status || undefined,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              bio: {
                contains: search,
              },
            },
          ],
          createdDate: {
            gte: new Date(startDate), //YY-MM-DD
            lte: new Date(endDate), //YY-MM-DD
          },
        },
        orderBy: {
          [sortby]: order,
        },
      });
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }

    const relativePath = `./Exports/Tests-${Math.floor(
      Math.random() * (99999 + 1),
    )}.pdf`;

    var document = {
      html: html,
      data: {
        tests: tests,
      },
      path: relativePath,
      type: '',
    };

    try {
      const base64 = await exportPDF(document);
      return successHandler({ base64 }, 'Success');
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async hudaiPdf(res) {
    var html = fs.readFileSync('./src/templates/pdf/testlist.html', 'utf8');
    let tests;
    try {
      tests = await this.prisma.test.findMany();
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }

    const relativePath = `./Exports/Tests-${Math.floor(
      Math.random() * (99999 + 1),
    )}.pdf`;

    var document = {
      html: html,
      data: {
        tests: tests,
      },
      path: relativePath,
      type: '',
    };

    return await this.exportPDF(document, res);
  }

  async exportPDF(document: any, res: any) {
    try {
      const resPonse = await pdf.create(document);
      console.log(resPonse);
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
    var buffer = fs.readFileSync(document.path);
    const head = {
      'Content-Length': Buffer.byteLength(buffer),
      'Content-Type': 'application/pdf',
    };
    res.writeHead(200, head); // write
    //Delete the file
    fs.unlinkSync(path.resolve(document.path));
    const stream = bufferToStream(buffer); // convert buffer to stream
    stream.pipe(res); // send to client
  }
}
