import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class CreateCompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  contactNumber: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  website?: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  adminEmail: string;

  @ApiProperty()
  adminFullName: string;

  @ApiProperty()
  adminPhone: string;

  @ApiPropertyOptional()
  status?: Status;
}
