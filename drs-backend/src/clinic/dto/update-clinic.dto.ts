import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class UpdateClinicDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  address: string;

  @ApiPropertyOptional()
  mobile: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  longitude: number;

  @ApiPropertyOptional()
  latitude: number;

  @ApiPropertyOptional()
  status: Status;
}
