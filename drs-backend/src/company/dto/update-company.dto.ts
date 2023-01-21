import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class UpdateCompanyDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  shortName?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  contactNumber?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  website?: string;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  adminEmail?: string;

  @ApiPropertyOptional()
  adminFullName?: string;

  @ApiPropertyOptional()
  adminPhone?: string;

  @ApiPropertyOptional()
  status?: Status;

  @ApiPropertyOptional()
  logoPath?: string;
}
